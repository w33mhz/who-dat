-- Who Dat? online room foundation.
-- Private match state is intentionally inaccessible to browser clients.
-- All reads/writes must go through server-side Edge Functions that return
-- only the requesting player's permitted view of the game.

create extension if not exists pgcrypto;

create table if not exists public.game_rooms (
  id uuid primary key default gen_random_uuid(),
  room_code_hash text not null unique,
  status text not null default 'waiting'
    check (status in ('waiting', 'active', 'finished', 'expired')),
  host_token_hash text not null,
  guest_token_hash text,
  host_secret_index integer,
  guest_secret_index integer,
  active_player smallint not null default 0 check (active_player in (0, 1)),
  board_size integer not null check (board_size >= 4 and board_size <= 200),
  character_pack jsonb not null,
  player_state jsonb not null default '{"0":{"eliminated":[],"asked":[],"log":[]},"1":{"eliminated":[],"asked":[],"log":[]}}'::jsonb,
  winner smallint check (winner in (0, 1)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '24 hours',
  constraint guest_state_pair check (
    (status = 'waiting' and guest_token_hash is null and guest_secret_index is null)
    or status <> 'waiting'
  )
);

create index if not exists game_rooms_expiry_idx on public.game_rooms (expires_at);
create index if not exists game_rooms_status_idx on public.game_rooms (status);

alter table public.game_rooms enable row level security;

-- Deny direct client access. Edge Functions use the service role and must
-- authenticate each player token and return a deliberately filtered response.
revoke all on table public.game_rooms from anon, authenticated;
drop policy if exists "No direct room access" on public.game_rooms;
create policy "No direct room access" on public.game_rooms
  for all to anon, authenticated using (false) with check (false);

comment on table public.game_rooms is
  'Server-only Who Dat online match state. Never expose raw rows to clients.';
