// Game data only: traits are rules, reactions (R) are presentation.
export const Q={human:"Is your character a person?",animal:"Is your character an animal?",food:"Is your character food?",fantasy:"Is your character a fantasy creature?",festive:"Is your character part of a holiday?",glasses:"Does your character wear glasses?",hat:"Does your character wear a hat?",mustache:"Does your character have a mustache?",wings:"Does your character have wings?",tail:"Does your character have a tail?",horns:"Does your character have horns?",magic:"Does your character use magic?",cheese:"Does your character have cheese?",red:"Does your character have something red?",green:"Does your character have something green?",fur:"Does your character have fur?",pumpkin:"Is your character a pumpkin?",snow:"Does your character have snow?",gift:"Does your character have a gift?",costume:"Is your character wearing a costume?",freckles:"Does your character have freckles?",bald:"Is your character bald?",curly:"Does your character have curly hair?",beard:"Does your character have a beard?",scales:"Does your character have scales?",glow:"Does your character have glowing eyes?",floppy:"Does your character have floppy ears?",stripes:"Does your character have stripes?",spots:"Does your character have spots?",feathers:"Does your character have feathers?",sweet:"Is your character sweet?",frosting:"Does your character have frosting?",sprinkles:"Does your character have sprinkles?",spicy:"Is your character spicy?"};
export const R={human:"👋",animal:"🐾",food:"😋",fantasy:"✨",festive:"🎉",glasses:"😉",hat:"🎩",mustache:"➰",wings:"🕊️",tail:"🐾",horns:"😈",magic:"✨",cheese:"👍",red:"❤️",green:"💚",fur:"🧶",pumpkin:"🎃",snow:"❄️",gift:"🎁",costume:"🎭",freckles:"🌟",bald:"😮",curly:"🌀",beard:"🧔",scales:"🐟",glow:"💡",floppy:"🐕",stripes:"🦓",spots:"⚫",feathers:"🪶",sweet:"🍬",frosting:"🍰",sprinkles:"🎊",spicy:"🔥"};
const P=(id,name,emoji,rows)=>({id,name,emoji,chars:rows.trim().split("\n").map(l=>{const[n,e,t]=l.split("|");return{id:id+"-"+n.toLowerCase().replace(/\W+/g,"-"),pack:id,n,e,t:t?t.split(" "):[]}})});
export const PACKS=[
P("funny","Funny Faces","🤪",`Prof Pickles|🧐|human glasses mustache hat
Granny Gus|👵|human glasses
Captain Beard|🧔|human mustache red
Cool Kai|😎|human glasses hat
Wizard Wally|🧙|human magic hat mustache
Santa Sam|🎅|human hat mustache red
Freckle Fay|👧|human freckles
Bald Bob|👨‍🦲|human bald glasses
Curly Cass|👩‍🦱|human curly freckles
Beardo Ben|👴|human beard hat
Disguise Dan|🥸|human glasses mustache costume
Clown Cleo|🤡|human costume red curly`),
P("fantasy","Fantasy & Creatures","🐉",`Ember|🐉|fantasy wings tail horns green
Fairy Fern|🧚|fantasy wings magic green
Zorp|👽|fantasy green
Fiona Fiend|👹|fantasy horns red
Unie|🦄|fantasy animal horns magic tail fur
Ghostie|👻|fantasy
Sir Scale|🐲|fantasy scales green tail
Gobo|👺|fantasy red hat
Moxie|🧞|fantasy magic glow
Robo Rick|🤖|fantasy glow red
Vlad Fang|🧛|fantasy wings red hat
Mer Marla|🧜|fantasy scales tail magic`),
P("animals","Animals & Pets","🦊",`Rex|🦖|animal tail green
Leo|🦁|animal fur tail
Penny|🐧|animal wings feathers
Bea|🐝|animal wings tail
Fox Finn|🦊|animal fur tail red
Panda Pat|🐼|animal fur
Dotty|🐶|animal fur tail floppy
Tiger Tess|🐯|animal fur stripes tail
Cow Cora|🐮|animal spots tail
Hoppy|🐰|animal fur floppy
Owl Ollie|🦉|animal wings feathers glasses
Frog Fred|🐸|animal green`),
P("food","Food Fight","🍕",`Cheesy Pete|🍕|food cheese red
Sir Burger|🍔|food cheese
Strawberry Sue|🍓|food red green
Taco Tito|🌮|food cheese green
Cherry Pop|🍒|food red tail
Corn Cob|🌽|food green
Donut Dee|🍩|food sweet sprinkles
Cupcake Cam|🧁|food sweet frosting
Ice Cream Ivy|🍦|food sweet frosting sprinkles
Sushi Suki|🍣|food spicy
Pepper Pablo|🌶️|food red spicy
Pancake Pia|🥞|food sweet`),
P("seasonal","Seasonal Specials","🎃",`Jack-O|🎃|festive pumpkin
Frosty|⛄|festive snow hat
Gift Gabby|🎁|festive gift red
Spooky Sal|💀|festive costume
Tree Tina|🎄|festive green gift
Cupid Cal|💘|festive red wings
Elf Ellie|🧝|festive green hat
Turkey Tom|🦃|festive feathers tail
Party Pat|🥳|festive gift hat
Egg Edie|🥚|festive spots red
Sunny|🌞|festive glasses
Witch Wanda|🧙‍♀️|festive magic hat costume`)];
