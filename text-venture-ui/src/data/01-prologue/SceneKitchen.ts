import { TextScene } from "../../model/TextScene";

export const SceneKitchen: TextScene = {
  type: "scene",
  id: "kitchen",
  name: "The Kitchen",
  description:
    "The kitchen stood silent, its black and white tiled floor contrasting with the cornered refrigerator, gently humming its vintage allure, while a towering pile of dishes occupied the sink.",
  paragraphs: [
    "{player:hardy-grow:Hardy} and {player:isa-ruff:Isa} stepped into the kitchen, they were immediately greeted by the contrasting black and white tiles adorning the floor. The pattern seemed to dance beneath their feet, creating an optical illusion that made them question the very fabric of reality. {player:isa-ruff:Isa} stood paralyzed, feeling like a pawn controlled by a cosmic puppeteer in a vast intergalactic chess game.",
    "In the sink, a towering {thing:pile-of-dishes:pile of dishes} defied the laws of gravity, as if daring {player:isa-ruff:Isa} to take up the challenge. Laziness whispered like a snake in her ear, tempting her to postpone the arduous task. {player:hardy-grow:Hardy}, ever the responsible one, couldn't help but frown at the sight, hoping for a glimmer of improvement.",
    "An old {thing:refrigerator:refrigerator} stood proudly, its gently humming song a testament to its vintage allure. Its curved design, a relic from a bygone era, added a touch of nostalgia to the kitchen's atmosphere. Meanwhile, on the {thing:sideboard:sideboard}, a {thing:tea-service:tea service} adorned with a golden rim and delicate flower decorations miraculously escaped the grime horizon of the black hole in the sink.",
    "A {thing:kettle:green enamel kettle}, perched atop the {thing:stove:stove}, yearned for the fire that would awaken its true purpose. It longed to emit a shrill whistle, signaling the arrival of sacred tea time, an oasis of serenity in the midst of chaos. And through it all, the drip-drop-dripping of the {thing:faucet:faucet} provided the cacophonic rhythm of the kitchen's ambiance.",
    "'{player:isa-ruff:Isa}, my dear,' {player:hardy-grow:Hardy} begins, his voice gentle and diplomatic. 'I couldn't help but notice the gravity-defying feat performed by our dish collection. It seems they are eagerly awaiting your artistic touch to restore order in the kitchen realm.'",
  ],
  persons: [
    {
      type: "person",
      id: "landlord",
      description:
        "Mr. Crumplesworth, a stocky figure clad in a cheap nylon suit, exuded an air of snobbery and disdain.",
      name: "Mr. Crumplesworth",
      interactions: [],
      things: [],
    },
    {
      type: "person",
      id: "young-lady",
      description:
        "Mr. Crumplesworth, a stocky figure clad in a cheap nylon suit, exuded an air of snobbery and disdain.",
      name: "Young-Lady",
      interactions: [],
      things: [],
    },
  ],
  things: [
    {
      id: "pile-of-dishes",
      type: "thing",
      description: "Pile of dishes, defying the laws of gravity",
      interactions: [],
      name: "Pile of Dishes",
    },
    {
      id: "refrigerator",
      type: "thing",
      description: "Curvy refrigerator emitting a gentle humming",
      interactions: [],
      name: "Refrigerator",
    },
    {
      id: "sideboard",
      type: "thing",
      description:
        "The kitchen sideboard stood as an aged sentinel, its once vibrant colors now faded to a yellowed hue.",
      interactions: [],
      name: "Sideboard",
    },
    {
      id: "tea-service",
      type: "thing",
      description:
        "Tea service adorned with a golden rim and delicate flower decorations",
      interactions: [],
      name: "Tea Service",
    },
    {
      id: "kettle",
      type: "thing",
      description:
        "The green enamel kettle sat on the stove, its glossy surface reflecting the dancing flames, eagerly awaiting its tea-making duty.",
      interactions: [],
      name: "Kettle",
    },
    {
      id: "stove",
      type: "thing",
      description:
        "The stove stood proudly, its burners poised for action, ready to ignite the culinary creations that would grace its surface.",
      interactions: [],
      name: "Stove",
    },
    {
      id: "faucet",
      type: "thing",
      description:
        "The faucet sang its steady song, each drip and drop composing a rhythmic melody that echoed through the kitchen's air.",
      interactions: [],
      name: "Faucet",
    },
    {
      id: "pack-of-tea-bags",
      type: "thing",
      description:
        "Nestled in its packaging, the Earl Grey tea exuded an alluring aroma, promising a sip of pure delight and comforting warmth.",
      name: "Pack of Earl Grey",
      interactions: [],
    },
  ],
  interactions: [
    {
      type: "effects",
      id: "give-5-grants-to-landlord-defrosted",
      matchesAction: { oneOf: "give" },
      matchesObjects: [
        { oneIdOf: "5-grant" },
        { oneIdOf: "landlord-defrosted" },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",
          paragraphs: [
            "Relieved yet determined, {player:hardy-grow:Hardy} handed over the 5 grants received from the {person:young-lady:young lady}. {person:landlord-defrosted:Mr. Crumplesworth} pocketed the money with a sly grin, bidding them farewell as he exited the kitchen, his presence no longer casting a shadow over their lives.",
            "With a sigh of relief, {player:hardy-grow:Hardy} and {player:isa-ruff:Isa} knew they had overcome yet another obstacle, all while enjoying the comforting embrace of tea's warmth. As the kitchen settled into tranquility once more, they shared a knowing glance, ready to face whatever adventures awaited them next.",
            "The sofa from the {scene:fin:office} beckoned to {player:hardy-grow:Hardy} and {player:isa-ruff:Isa}, its plush cushions and inviting embrace luring them into a state of drowsiness. Its rich upholstery whispered promises of comfort and respite, enticing them with the allure of a quick nap.",
          ],
        },
        {
          type: "remove-thing-from-inventory",
          id: "5-grant",
        },
      ],
    },
    {
      type: "effects",
      id: "give-hot-tea-to-landlord-deep-frozen",
      matchesAction: { oneOf: "give" },
      matchesObjects: [
        { oneIdOf: "tea-service-filled-with-hot-tea" },
        { oneIdOf: "landlord-deep-frozen" },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",
          paragraphs: [
            "With quick-thinking ingenuity, {player:hardy-grow:Hardy} and {player:isa-ruff:Isa} extended a steaming cup of tea to the frozen {person:landlord-defrosted:Mr. Crumplesworth}, hoping to thaw his icy demeanor. The {person:landlord-defrosted:landlord}, his speech hindered by the freezing chill, stammered and doddered as he clutched the warm cup in trembling hands. The soothing warmth permeated his bones, gradually restoring his composure and melting away the frosty barriers that had held him captive. As the tea worked its magic, {person:landlord-defrosted:Mr. Crumplesworth}'s disposition softened, and he became more amenable to negotiation. With a newfound willingness, he agreed to address the broken door, understanding the urgency of its repair, while still insisting on the prompt payment of rent.",
          ],
        },
        {
          type: "change-person-in-scene",
          oldId: "landlord-deep-frozen",
          newId: "landlord-defrosted",
          description: "Defrosted Mr. Crumplesworth",
          name: "Defrosted Mr. Crumplesworth",
          things: [],
        },
      ],
    },
    {
      type: "effects",
      id: "use-key-refrigerator-with-landlord-locked",
      matchesAction: { oneOf: "use" },
      matchesObjects: [
        { oneIdOf: ["little-key", "refrigerator-with-landlord-locked"] },
        { oneIdOf: ["little-key", "refrigerator-with-landlord-locked"] },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",
          paragraphs: [
            "With the key retrieved from the desk, {player:hardy-grow:Hardy} and {player:isa-ruff:Isa} approached the {thing:refrigerator:refrigerator}, anticipation gleaming in their eyes. As they unlocked the frozen prison, a {person:landlord-deep-frozen:deep-frozen Mr. Crumplesworth} tumbled out, his voice reduced to mere mumbles of 'brr, brr.'",
          ],
        },
        {
          type: "change-person-in-scene",
          oldId: "landlord-trapped-in-refrigerator",
          newId: "landlord-deep-frozen",
          description: "Deep frozen Mr. Crumplesworth",
          name: "Deep frozen Mr. Crumplesworth",
          things: [],
        },
        {
          type: "change-thing-in-scene",
          oldId: "refrigerator-with-landlord-locked",
          newId: "refrigerator",
          description: "Curvy refrigerator emitting a gentle humming",
          name: "Refrigerator",
        },
      ],
    },
    {
      type: "effects",
      id: "give-tea-to-young-lady",
      matchesAction: {
        oneOf: "give",
      },
      matchesObjects: [
        { oneIdOf: "tea-service-filled-with-hot-tea" },
        { oneIdOf: "young-lady" },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: [
            "{person:young-lady:Young-Lady}: I must say, I was quite impressed with your convincing performance with {person:landlord-trapped-in-refrigerator:Mr. Crumplesworth}. The way you handled him was like a well-choreographed dance. It's not every day you see someone twirling and throwing their {person:landlord-trapped-in-refrigerator:landlord} into a {thing:refrigerator-with-landlord-locked:refrigerator}!",
            "{player:isa-ruff:Isa}: (smirking) Well, innit, it's all in the bleedin' art of persuasion, ain't it? Pink Batty 'as a way of makin' people see things our way, luv.",
            "{player:hardy-grow:Hardy}: (chuckles) Indeed, it seems we have a unique talent for handling tricky situations. But I'm curious, what brings you to our humble abode, and how can we be of service to you?",
            "{person:young-lady:Young Lady}: (leaning forward) Well, here's the thing. My husband has always wanted to learn a few ballerina moves, and I've been searching for the perfect instructors. After witnessing your extraordinary skills, I believe you two might be the ones we're looking for.",
            "{player:isa-ruff:Isa}: (raising an eyebrow) Ballerina lessons, you say? That's an intriguing request. And how much are we talking about?",
            "{person:young-lady:Young Lady}: (smiling) Five grand, in cash. No questions asked. If you can teach my husband a few graceful moves, the money is yours.",
            "{player:hardy-grow:Hardy}: (stroking his chin) Well, that's quite an offer. We do have a knack for teaching the art of dance. We accept your proposal. Consider your husband's ballerina lessons booked!",
            "{person:young-lady:Young Lady}: (handing over the money) Excellent! I knew I made the right choice. I'll leave you to your tea and discuss the details with my husband. Looking forward to seeing what you two can accomplish together.",
            "As they clinked their tea cups together, an unexpected partnership formed, fueled by ambition and the allure of a generous payout. The kitchen, still recovering from the chaos, became a temporary meeting ground for their shared endeavors. And with the money safely in their hands, the future looked brighter than ever.",
            "The {thing:refrigerator-with-landlord-locked:chained and locked refrigerator}, with {person:landlord-trapped-in-refrigerator:Mr. Crumplesworth} trapped inside, rattled and shook with a frenzied fury, resembling a rabid rat cage in the midst of a chaotic dance. Its vibrations echoed through the kitchen, creating a dissonant symphony that seemed to mock the plight of the frozen captive within.",
          ],
        },
        {
          type: "add-thing-to-inventory",

          thing: {
            type: "thing",
            id: "5-grant",
            description: "5 grant",
            name: "5 grant",
            interactions: [],
          },
        },
      ],
    },
    {
      type: "effects",
      id: "use-kettle-filled-with-hot-water-with-tea-service-and-tea-bags",
      matchesAction: { oneOf: "use" },
      matchesObjects: [
        {
          oneIdOf: [
            "kettle-filled-with-hot-water",
            "tea-service",
            "pack-of-tea-bags",
          ],
        },
        {
          oneIdOf: [
            "kettle-filled-with-hot-water",
            "tea-service",
            "pack-of-tea-bags",
          ],
        },
        {
          oneIdOf: [
            "kettle-filled-with-hot-water",
            "tea-service",
            "pack-of-tea-bags",
          ],
        },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: {
            "hardy-grow": [
              "With a gentle touch, {player:hardy-grow:Hardy} reached for the tea bags and delicately placed them into the waiting {thing:tea-service-filled-with-hot-tea:tea service}. The fragrant aroma of the tea began to fill the kitchen, enveloping the room in a comforting embrace. As he stirred the tea, the golden rim of the tea cups glimmered, adding a touch of elegance to the scene. The {thing:tea-service-filled-with-hot-tea:tea service}, now bore the marks of a delightful tea ceremony, a testament to the impending moment of relaxation and indulgence.",
            ],
            "isa-ruff": [
              "With a swift and purposeful movement, {player:isa-ruff:Isa} snatched the tea bags and hurriedly tossed them into the waiting {thing:tea-service-filled-with-hot-tea:tea service}. The aromatic essence of the tea wafted through the air, infusing the kitchen with its comforting allure. As she stirred the tea, the golden rim of the tea cups shimmered, a testament to the impending moment of pure indulgence. The {thing:tea-service-filled-with-hot-tea:tea service}, now bore the charming imperfections of a lively tea ceremony, signaling the imminent tranquility and respite that awaited them.",
            ],
          },
        },
        {
          type: "add-paragraph-to-scene",

          paragraphs: [
            "As the kitchen door swung open, the {person:young-lady:Young-Lady} entered, her eyes wide with curiosity. She couldn't help but notice the remnants of the recent commotion and the lingering aroma of tea in the air. With a raised eyebrow, she posed a rhetorical question, 'What on earth happened in here?'",
            "Her gaze shifted towards the {thing:tea-service-filled-with-hot-tea:tea service}, a glimmer of anticipation in her eyes. 'I fancy a cup of tea,' she declared, unable to resist the allure of the aromatic brew. The chaos and noise seemed forgotten, replaced by the soothing prospect of a warm cup of tea in the company of newfound companions.",
          ],
        },
        {
          type: "change-thing-in-scene",

          oldId: "kettle-filled-with-hot-water",
          newId: "kettle",
          description: "green enamel kettle",
          name: "green enamel kettle",
        },
        {
          type: "change-thing-in-scene",

          oldId: "tea-service",
          newId: "tea-service-filled-with-hot-tea",
          description: "Tea service filled with hot tea",
          name: "Tea service filled with hot tea",
        },
      ],
    },
    {
      type: "effects",
      id: "use-kettle-filled-with-water-with-stove",
      matchesAction: { oneOf: "use" },
      matchesObjects: [
        { oneIdOf: ["stove", "kettle-filled-with-water"] },
        { oneIdOf: ["stove", "kettle-filled-with-water"] },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: {
            "hardy-grow": [
              "With a deft twist of his wrist, {player:hardy-grow:Hardy} ignites the flames beneath the {thing:stove:stove}, the blue tongues of fire dancing to life. He adjusts the heat knob to the perfect intensity, feeling the warmth radiate throughout the kitchen. A sense of anticipation fills the air as he stands by, eagerly awaiting the moment when the {thing:kettle-filled-with-hot-water:kettle} will emit its shrill whistle, signaling the arrival of the long-awaited tea time.",
            ],
            "isa-ruff": [
              "{player:isa-ruff:Isa}, with a confident touch, ignites the dormant fire of the {thing:stove:stove}. The flames dance to life, casting a warm glow on her face as she adjusts the intensity. She stands there, poised and eager, anticipation building within her as she waits for the {thing:kettle-filled-with-hot-water:kettle}'s melodic whistle to pierce the air. The kitchen becomes a sanctuary of expectation, with every passing second amplifying the delightful promise of a steaming cup of tea.",
            ],
          },
        },
        {
          type: "change-thing-in-scene",

          oldId: "kettle-filled-with-water",
          newId: "kettle-filled-with-hot-water",
        },
      ],
    },
    {
      type: "effects",
      id: "use-kettle-at-tea-time-with-faucet",
      matchesAction: { oneOf: "use" },
      matchesObjects: [
        { oneIdOf: ["kettle-at-tea-time", "faucet"] },
        { oneIdOf: ["kettle-at-tea-time", "faucet"] },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: {
            "hardy-grow": [
              "With a fluid motion, {player:hardy-grow:Hardy} grasped the {thing:kettle-filled-with-water:green enamel kettle} and positioned it beneath the {thing:faucet:faucet}. He turned the handle, and a steady stream of water cascaded into the {thing:kettle-filled-with-water:kettle}, filling it with a soothing rush, heralding the forthcoming symphony of tea.",
              "{player:hardy-grow:Hardy} carefully positions the {thing:kettle-filled-with-water:filled kettle} onto the waiting {thing:stove:stove}. The metal softly rests upon the burner, and he adjusts its placement with meticulous attention. An air of expectation fills the room as the {thing:kettle-filled-with-water:kettle} assumes its rightful position, poised to carry out its sacred role in the imminent tea ceremony.",
            ],
            "isa-ruff": [
              "{player:isa-ruff:Isa}, assertively gripping the {thing:kettle-filled-with-water:green enamel kettle}, marches towards the {thing:faucet:faucet}. She yanks the knob, unleashing a wild torrent of water that eagerly fills the {thing:kettle-filled-with-water:kettle} with a raucous splash. The cacophony of gushing water matches {player:isa-ruff:Isa}'s determined energy, creating a tempestuous melody in the kitchen.",
              "{player:isa-ruff:Isa}, swiftly placing the {thing:kettle-filled-with-water:filled kettle} onto the waiting {thing:stove:stove}, the metal clinks against the burner. With determined precision, she adjusts the position. The anticipation in the air is palpable as the {thing:kettle-filled-with-water:kettle} finds its rightful place, ready to fulfill its duty in the forthcoming tea-making ritual.",
            ],
          },
        },
        {
          type: "change-thing-in-scene",

          oldId: "kettle-at-tea-time",
          newId: "kettle-filled-with-water",
          description: "Kettle filled with water",
        },
      ],
    },
    {
      type: "effect-or-random",
      id: "look-at-kettle-at-tea-time",
      matchesAction: { oneOf: "look-at" },
      matchesObjects: [{ oneIdOf: "kettle-at-tea-time" }],
      responses: {
        "hardy-grow": [
          "Ah, the kettle, a vessel of anticipation, awaiting the transformation of water into a symphony of flavors.",
          "Patience, my dear kettle, for soon we shall embark on the journey of brewing the perfect cup of tea.",
          "The kettle, a silent sentinel, guarding the gateway to a world of warmth and tranquility.",
          "In due time, dear kettle, we shall unlock your potential and unleash the aromatic essence of tea.",
          "Ah, the anticipation mounts as the kettle stands poised, ready to herald the commencement of tea time.",
          "The kettle, a humble servant, prepared to unleash the alchemy of tea leaves and water upon our senses.",
          "Time stands still as the kettle awaits its purpose, an emblem of the impending pleasure that awaits.",
          "The kettle, a conductor of heat, orchestrating the dance of molecules, igniting the essence of tea.",
          "With every passing moment, the kettle teases us with the promise of a steaming cup of liquid solace.",
          "The kettle's presence speaks volumes, reminding us of the transformative power of a well-brewed cup of tea.",
        ],
        "isa-grow": [
          "Oi, you bloomin' kettle, 'urry up and get on with it. I'm dyin' 'ere for a cuppa.",
          "Come on, ya lazy thing, start boilin'. I ain't got all day to wait for me tea.",
          "Oi, kettle, what's the hold-up? I'm parched and need me brew, pronto.",
          "Ah, the kettle's takin' its sweet time. Ain't got time for slowpokes when it comes to tea, mate.",
          "Oi, kettle, stop bein' a slacker and start makin' me tea. I can't stand the wait.",
          "Bloody 'ell, the kettle's bein' as slow as a snail. I need me cuppa now, not in a fortnight.",
          "Oi, kettle, 'ave ya forgotten what ya job is? Start boilin', or I'll give ya a right wallop.",
          "Come on, kettle, don't be a useless git. Get yer act together and make me tea, sharpish.",
          "Blimey, this kettle's testin' me patience. I've got me tea bags ready, so 'urry up, ya daft thing.",
          "Oi, kettle, if ya don't start boilin' soon, I'll throw ya out the bleedin' window. Me tea can't wait forever.",
        ],
      },
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: {
            "hardy-grow":
              "Hardy's eyes gleamed with anticipation as the {thing:kettle-at-tea-time:kettle} reached its crescendo. He savored the aromatic promise of tea.",
            "isa-ruff":
              "Isa's eyes narrowed with impatience as she stared at the stillness of the {thing:kettle-at-tea-time:kettle}. She longed for the comforting embrace of a hot cup of tea.",
          },
        },
      ],
    },
    {
      type: "effects",
      id: "use-refrigerator-with-landlord-and-chain",
      matchesAction: { oneOf: "use" },
      matchesObjects: [
        { oneIdOf: ["refrigerator-with-landlord", "chain-with-open-lock"] },
        { oneIdOf: ["refrigerator-with-landlord", "chain-with-open-lock"] },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: [
            "As the chaotic scene unfolded, {player:hardy-grow:Hardy}'s eyes fell upon the chain and lock they had retrieved earlier from under the sofa. An idea sparked in his mind. With quick thinking, he rushed towards the {thing:refrigerator-with-landlord-locked:refrigerator}, chain in hand. With a swift motion, he secured the chain around the fridge, looping it through the handle and fastening the lock with a resounding click.",
            "'{player:isa-ruff:Isa}, hold on! We've got it locked up tight!' {player:hardy-grow:Hardy} shouted over the rattling noise of the {thing:refrigerator-with-landlord-locked:refrigerator} door. He saw her determined grip on the door, her fingers gripping tightly, refusing to let go.",
            "With the {thing:refrigerator-with-landlord-locked:refrigerator} now securely chained, {player:hardy-grow:Hardy}'s attention turned back to {player:isa-ruff:Isa}. 'Keep holding on, {player:isa-ruff:Isa}! We'll get through this together,' he encouraged, his voice filled with determination and support.",
            "As the intense ordeal subsided, {player:hardy-grow:Hardy} reached into his pocket and retrieved a neatly folded handkerchief. With a graceful flourish, he dabbed at his forehead, mopping away the beads of sweat that had gathered during their struggle. The fine fabric of the handkerchief glided smoothly against his skin, providing a momentary relief.",
            "Checking his wristwatch with a refined gesture, {player:hardy-grow:Hardy}'s eyes widened slightly. 'Ah, it appears that the time has come,' he remarked. 'Tea time has finally arrived.'",
          ],
        },
        {
          type: "remove-thing-from-inventory",

          id: "chain-with-open-lock",
        },
        {
          type: "change-thing-in-scene",

          oldId: "refrigerator-with-landlord",
          newId: "refrigerator-with-landlord-locked",
          name: "Refrigerator with chain around it and landlord locked tight",
          description:
            "Refrigerator with chain around it and landlord locked tight",
        },
        {
          type: "change-thing-in-scene",

          oldId: "kettle",
          newId: "kettle-at-tea-time",
        },
      ],
    },
    {
      type: "effects",
      id: "use-landlord-with-refrigerator-and-pink-batty",
      matchesAction: { oneOf: "use" },
      matchesObjects: [
        { oneIdOf: ["landlord", "refrigerator", "pink-batty"] },
        { oneIdOf: ["landlord", "refrigerator", "pink-batty"] },
        { oneIdOf: ["pink-batty"] },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: [
            "{player:isa-ruff:Isa}'s voice dripped as she confronted the landlord. 'Listen 'ere, Mr. Slumlord Crumple-piece of shit, we ain't  payin' a single bleedin' cent until you fix that door. Can't even leave the office, can we? So sort it out, or you won't be seein' a penny from us.' Her words carried a fierce determination and a hint of rebellion.",
            "Mr. Crumplesworth sneered at {player:isa-ruff:Isa}, his tone laced with snobbery. 'Oh, it would be a relief for the world, indeed, if we never had to see the likes of you. And as for the door, my dear, it's of no concern to me. Fix it yourself or remain trapped like the uncouth ruffian you are.' His condescending words hung in the air, fueling {player:isa-ruff:Isa}'s anger.",
            "Sensing the impending eruption, {player:hardy-grow:Hardy} quickly sought cover, bracing himself for the volcanic outburst that was about to ensue.",
            "{player:isa-ruff:Isa}'s fuse bursted, the fire in her eyes ignited. Finally her early ballerina lessons paid off, with a 'Twirling Willow' a one footed whirlwind like rotation, she held Mr. Crumplesworth with Pink Batty in a headlock and at the same time her twirling foot opened the {thing:refrigerator-with-landlord:refrigerator}. Finishing the move in one flow she turned again throwing Mr. Crumplesworth in to the freezing hell, where he belonged.",
            "With loud whomp Mr. Crumplesworth vanished in the {thing:refrigerator-with-landlord:refrigerator} while {player:isa-ruff:Isa} fighting to keep the rattling door shut",
          ],
        },
        {
          type: "change-person-in-scene",
          oldId: "landlord",
          newId: "landlord-trapped-in-refrigerator",
          description: "The landlord is trapped in the refrigerator",
          name: "Landlord trapped in refrigerator",
        },
        {
          type: "change-thing-in-scene",

          oldId: "refrigerator",
          newId: "refrigerator-with-landlord",
          description:
            "The refrigerator stood in the corner, its cold metal surface hiding the frozen form of Mr. Crumplesworth. Isa strained to keep the rattling door shut, hoping the icy abyss wouldn't claim her too.",
          name: "Refrigerator with Landlord trapped inside",
        },
      ],
    },
    {
      type: "effects",
      id: "talk-to-landlord",
      matchesAction: { oneOf: "talk-to" },
      matchesObjects: [{ oneIdOf: "landlord" }],
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: [
            "{player:hardy-grow:Hardy}, ever the smooth talker, swiftly interjected before {player:isa-ruff:Isa}'s aftershock could erupt into a full-blown confrontation. He straightened his posture, mustered his most charming smile, and addressed {person:landlord:Mr. Crumplesworth} in a tone of earnest diplomacy.",
            "'Dear {person:landlord:Mr. Crumplesworth}, I believe we can find a mutually beneficial agreement that will alleviate any concerns you may have. We understand the inconvenience caused by our recent escapades, and we are committed to rectifying the situation. Allow us the opportunity to discuss a plan that ensures the timely payment of rent while addressing any issues that have arisen. I assure you, we value our tenancy here and wish to maintain a positive relationship with both you and the other residents.'",
            "The {person:landlord:landlord} glared at Hardy, his eyes filled with frustration and impatience. He responded with a stern tone, 'I've had enough of your endless escapades and excuses. The time for negotiations is over. Pay the rent in full today, or consider yourselves out of this apartment. I won't tolerate any more delays or disturbances from the likes of you.'",
          ],
        },
      ],
    },
    {
      id: "use-pink-batty-with-pile-of-dishes",
      type: "effects",
      matchesAction: { oneOf: "use" },
      matchesObjects: [
        {
          oneIdOf: ["pink-batty", "pile-of-dishes"],
        },
        {
          oneIdOf: ["pink-batty", "pile-of-dishes"],
        },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: [
            "As {player:isa-ruff:Isa}'s pent-up frustration soared to its zenith, she unleashed a tempestuous storm upon the towering mound of grimy dishes. Each strike of Pink Batty echoed like thunder, unleashing chaos and devastation. Fragile cups and delicate plates shattered into a sea of shards, while sturdy forks and knives bent and twisted under the force of her fury. Her eyes blazed with an infernal intensity, casting an ominous glow that could rival the eruption of a molten volcano.",
            "Yet, amidst the chaos, there was an unexpected grace to her actions. Despite the destructive force, the {thing:tea-service:tea service} on the {thing:sideboard:sideboard} remained untouched, as if protected by an invisible shield. With the precision of a heart surgeon, {player:isa-ruff:Isa} wielded Pink Batty, ensuring that not even a single clank disturbed the delicate heirloom.",
            "The sound that emanated from her was a symphony of chaos, a cacophony of crashing porcelain and metallic clatters. It echoed through the kitchen like an infernal anthem, as if {player:isa-ruff:Isa} was determined to rattle the very cage of the devil himself.",
            "But amidst the chaos and destruction, there was a glimmer of delight in {player:isa-ruff:Isa}'s eyes. A mischievous smile spread across her face, like a child on Christmas Eve.",
            "'Take that, you bleedin' plates! How d'you like that, ya useless lot?' Her voice echoed through the kitchen, a mix of anger and satisfaction.",
            "And when the storm subsided, and the wreckage lay in ruins, {player:isa-ruff:Isa} turned to {player:hardy-grow:Hardy} with a triumphant grin. 'Look, I took care of the bleedin' dishes,' she declared, her satisfaction evident in her tone. The kitchen may have been in disarray, but the pile of dirty dishes was no more.",
            "As the chaos of shattered dishes settled, the kitchen door swung open, revealing the stocky figure of the landlord, {person:landlord:Mr. Crumplesworth}. Clad in a cheap nylon suit that seemed to cling to him uncomfortably, he scowled at the scene before him. The veins on his forehead pulsed with frustration.",
            "'What in blazes is going on here?!' he bellowed, his voice filled with irritation. 'I've had it up to here with your antics! The noise, the mess, it's unbearable! If you two don't shape up, I'll terminate your bloody apartment agreement!'",
            "His words carried a weight of authority, reinforced by the reminder of their late rent payments. {player:hardy-grow:Hardy} and {player:isa-ruff:Isa} exchanged glances, knowing they were in deep trouble once again. The {person:landlord:landlord}'s complaints about the constant punk rock music reverberating through the building day and night echoed in their ears.",
            "'And let's not forget that blasted tiger loose in the stairways!' the {person:landlord:landlord} continued, his face turning a shade of crimson. 'This is the last straw! Get your act together or you'll be out on the street!'",
          ],
        },
        {
          type: "remove-tokens-from-scene",

          id: "pile-of-dishes",
        },
      ],
    },
    {
      id: "look-at-refrigerator",
      type: "effect-or-random",
      matchesAction: { oneOf: "look-at" },
      matchesObjects: [{ oneIdOf: "refrigerator" }],
      responses: {
        "hardy-grow": [
          "Ah, what a delightful curvy design this refrigerator possesses. A perfect blend of form and function.",
          "My dear, I must confess, my stomach emits a longing growl as I gaze upon this cool storage vessel.",
          "Oh, the wonders of modern refrigeration. It preserves our food, keeping it fresh and wholesome.",
          "Pray tell, is there anything more satisfying than a well-stocked fridge, ready to satiate our culinary desires?",
          "A quick glance at this magnificent appliance reminds me of the pleasure of a chilled refreshment on a warm summer's day.",
        ],
        "isa-ruff": [
          "Blimey, that bloomin' fridge is like a cold star, sucking the life out of everything it touches.",
          "I swear, that bleedin' thing can freeze a pint of beer faster than you can say 'cheers!",
          "It's colder than the Arctic in there, I tell ya. I wouldn't be surprised if I found a polar bear lurking inside.",
          "That fridge is like a freezer on steroids, mate. I bet it could turn a hot cuppa into an ice lolly in seconds.",
          "Brrr! That freezer is colder than me ex's heart. No wonder everything in there turns into a bloomin' ice cube.",
        ],
      },
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: {
            "hardy-grow": [
              "{player:hardy-grow:Hardy}'s gaze wandered over to the proud {thing:refrigerator:refrigerator} standing in the corner, its vintage charm beckoning him closer. A mischievous thought crossed his mind, as his eyes lingered on its well-stocked shelves. A pang of longing surged within him, tempting him with the promise of a delicious snack.",
            ],
            "isa-ruff": [
              "{player:isa-ruff:Isa} glanced at the freezer, her eyes narrowing in frustration. She muttered under her breath, 'Bloody 'ell, this bleedin' freezer turns everyfink into a ruddy ice block. Can't even enjoy a cold one proper, can I? Blimey, what a load of bollocks!'",
            ],
          },
        },
      ],
    },
    {
      id: "look-at-kettle",
      type: "effect-or-random",
      matchesAction: { oneOf: "look-at" },
      matchesObjects: [{ oneIdOf: "kettle" }],
      responses: {
        "hardy-grow": [
          "Ah, behold the kettle, a faithful vessel for the elixir of life. Its presence brings solace and anticipation.",
          "Remarkable, isn't it? This humble kettle, a testament to the traditions of tea-making and the passage of time.",
          "A fine kettle indeed, reminiscent of the ones cherished by my grandmother. It evokes memories of shared moments over a cup of tea.",
          "In this kettle lies the promise of warmth, comfort, and the soothing aroma of steeped tea leaves. It invites us to indulge in a cherished ritual.",
          "Look at this kettle, an emblem of reliability and steadfastness. A symbol of the essential role it plays in the pursuit of tea perfection.",
          "With a glance at this kettle, one can sense the legacy it carries. It has witnessed generations seeking solace in the embrace of a warm brew.",
          "An elegant kettle, embodying the artistry of design and the anticipation of a tea ceremony. Its presence elevates the act of tea-making to an almost reverent state.",
          "This kettle, with its polished exterior, stands as a beacon of tradition and refinement. A conduit for transforming mere water into a potion of serenity.",
          "The kettle, a sentinel in the kitchen, stands ready to embrace its duty with poise and grace. It invites us to partake in the timeless ritual of tea.",
          "Dear kettle, your purpose extends beyond the boiling of water. You symbolize the moments of respite, camaraderie, and introspection that tea brings forth.",
        ],
        "isa-ruff": [
          "Blimey, look at that kettle! It's seen more boiling than a pub on a Friday night!",
          "Cor, that kettle's got character, innit? Been through a few rounds, I reckon.",
          "Oi, kettle, you've got stories to tell, don't ya? Bet you've seen it all in this kitchen.",
          "Well, ain't you a sturdy old thing? Kettle like you knows 'ow to make a proper cuppa.",
          "Look at that kettle, all faithful and ready for action. Time to brew some proper tea!",
          "That kettle's a survivor, it is. Can take the heat and still whistles with pride.",
          "Right, kettle, let's get crackin'! Time to bring you back to life and boil up some magic.",
          "Oh, kettle, you're a trusty companion in this chaos. Together, we'll conquer the world, one cuppa at a time.",
          "Well, hello there, you shiny kettle. Ready to dance with the flames and make our tea dreams come true?",
          "Ah, the kettle, the soul of any kitchen. With you around, we're just a few minutes away from a warm cuppa bliss.",
        ],
      },
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: {
            "hardy-grow": [
              "{player:hardy-grow:Hardy}'s eyes lingered on the {thing:kettle:green enamel kettle} perched on the {thing:stove:stove}, a temptress awaiting her moment to whistle. However, his rationality prevailed, recognizing that the time for tea had not yet ripened. Patience, he thought, for tea waits for no one.",
            ],
            "isa-ruff": [
              "Isa Ruff's gaze fixated upon the green enamel kettle, its worn exterior telling tales of countless boiling rituals. The chipped edges and faint rust spots added character to its humble presence, as if it held the secrets of a thousand steaming cups, waiting to be unleashed.",
            ],
          },
        },
      ],
    },
    {
      id: "look-at-tea-service",
      type: "effect-or-random",
      matchesAction: {
        oneOf: "look-at",
      },
      matchesObjects: [
        {
          oneIdOf: "tea-service",
        },
      ],
      responses: {
        "hardy-grow": [
          "Ah, the cherished tea service. She really loved that nice old woman, didn't she?",
          "This tea set, a testament to her affection for the dear departed grandmother.",
          "One can't help but admire the sentimental value attached to this exquisite tea service.",
          "A nostalgic artifact, the tea set invokes fond memories of her beloved grandmother.",
          "A beautiful tea service, cherished by its previous owner. Such sentimental value it holds.",
          "In this tea service lies a testament to the deep connection she shared with her grandmother.",
          "The elegance of this tea set speaks of her admiration and respect for her late grandmother.",
          "A charming tea service, a symbol of the affection she held for the dear departed.",
          "The delicate craftsmanship of this tea set reflects her appreciation for fine heirlooms.",
          "This tea service, a poignant reminder of the special bond she shared with her beloved grandmother.",
        ],
        "isa-ruff": [
          "Blimey, reminds me of me dear old gran. Miss ya, ya old teapot!",
          "Cor, look at that fancy tea set. Bet it was owned by some posh bird.",
          "Oi, that's a proper posh tea service. Makes me feel like a right proper lady, it does.",
          "Oh, gran's spirit must be hoverin' over this tea set. Bless 'er soul.",
          "Gawd, look at the intricate design on that teapot. It's like a work of art, innit?",
          "Reminds me of Sunday tea at me nan's. Good times, good times.",
          "Blimey, this tea service is a fancy bit, ain't it? Almost too fancy for us.",
          "Ah, memories of me gran's fine china. Makes me feel all warm and fuzzy inside.",
          "That tea set's got a touch of class, it does. Proper fancy, just like gran used to have.",
          "This tea service takes me back, reminds me of me childhood. Wish gran was still 'ere.",
        ],
      },
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: {
            "hardy-grow": [
              "{player:hardy-grow:Hardy}'s eyes were irresistibly drawn to the {thing:tea-service:tea service} adorning the {thing:sideboard:sideboard}, its golden rim sparkling under the kitchen light. He couldn't help but be filled with awe at the impeccable condition of the delicate heirloom. It left him pondering the enigma of how {player:isa-ruff:Isa}, with her deep attachment to her grandma, had managed to preserve it with such care and devotion.",
            ],
            "isa-ruff": [
              "{player:isa-ruff:Isa}'s gaze drifts towards the {thing:sideboard:sideboard}, where her grandma's {thing:tea-service:tea service} sits, a cherished heirloom passed down through generations. The golden rim and delicate flower decorations gleam under the soft kitchen light, imbuing the atmosphere with a sense of nostalgia and warmth.",
            ],
          },
        },
      ],
    },
    {
      id: "look-at-pile-of-dishes",
      type: "effect-or-random",
      matchesAction: {
        oneOf: "look-at",
      },
      matchesObjects: [
        {
          oneIdOf: "pile-of-dishes",
        },
      ],
      responses: {
        "hardy-grow": [
          "Oh dear, when will she ever attend to this overwhelming pile of dishes?",
          "Goodness gracious, one wonders when she'll find the time to address this towering mess.",
          "My word, the sight of these neglected dishes never fails to astound me.",
          "One can't help but ponder when she'll take it upon herself to tackle this monumental task.",
          "It's a recurring pattern, the accumulation of these dishes. Will it ever be resolved?",
          "The perpetual presence of this dish mountain leaves one to question the timeline of its resolution.",
          "One might hope that the attention towards these dishes matches the urgency of their condition.",
          "It seems an ongoing challenge for her to bestow her efforts upon this formidable collection of dishes.",
          "In the realm of dish cleanliness, her endeavors appear to be a distant aspiration.",
          "The persistence of this dish pile begs the question of when she'll seize the opportunity to address it.",
          "It becomes a regular spectacle, the accumulation of these dishes, without an imminent solution in sight.",
          "It is a lamentable sight, these neglected dishes awaiting their rightful attention.",
          "The perpetuity of this dish stack continues to be a cause for concern and curiosity.",
          "One wonders when the stars will align, prompting her to tackle this colossal dish predicament.",
          "The chronicles of these dishes unfold, with an ever-present anticipation of their eventual restoration.",
          "The saga of this dish pile persists, inviting contemplation on the future of its resolution.",
          "It is a perennial occurrence, the steadfast presence of these dishes, awaiting their reckoning.",
          "The longevity of this dish congregation prompts speculation on the timing of its dispersal.",
          "The endurance of this dish pile demands attention, as its reign over the kitchen endures.",
          "The saga of this dish accumulation continues, leaving one to ponder its eventual conclusion.",
        ],
        "isa-ruff": [
          "Blimey, what's that eerie black spot doing amidst all this mess?",
          "Bloody hell, this pile of dishes is giving me an acid trip!",
          "Oi, it's repulsing me, defying gravity like a proper wanker!",
          "Cor blimey, look at that black void, mocking the laws of nature!",
          "What in the world? That pile of dishes is like a magnet for my disgust!",
          "Talk about a cosmic joke, that black abyss among the dishes is messing with my head!",
          "That black hole there is defying logic, making me question my own sanity!",
          "Gawd, that black spot is as inviting as a poke in the eye with a sharp stick!",
          "Oi, that pile of dishes is like a portal to another bloody dimension!",
          "It's like the dishes have gone on a rebellious trip, leaving us with that unsettling black hole!",
          "That black spot is like a cursed stain, defying the gravitational pull of cleanliness!",
          "Looks like the dishes decided to host their own horror show, with that creepy black spot as the star!",
          "I swear, that black void is playing mind games with me, contrasting against the laws of nature!",
          "Well, ain't that a lovely sight? A black spot mocking the very essence of gravity!",
          "Oi, that black hole in the middle of the dishes is like an unwelcome guest at a party!",
          "Can't 'ave a proper kitchen without a dose of weirdness, and that black spot fits the bill!",
          "Blimey, I reckon that black spot's got its own gravitational force, pullin' in all the filth!",
          "What's with that cursed black hole? It's like a magnet for all things grim and ghastly!",
          "Oi, that black spot's like a bloody portal to the underworld, defyin' the laws of cleanliness!",
          "I tell ya, mate, that black spot's got more tricks up its sleeve than a dodgy magician!",
        ],
      },
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: {
            "hardy-grow": [
              "{player:hardy-grow:Hardy} takes a step back, keeping a safe distance, ready to dodge any fiery outburst. 'I understand that the sink of {thing:pile-of-dishes:never-ending dishes} is a challenge of monumental proportions. But fear not, my resilient partner, for I believe in your ability to conquer this task with grace and finesse.'",
            ],
            "isa-ruff": [
              "As {player:isa-ruff:Isa}'s gaze is irresistibly drawn towards the sink, she feels a peculiar fascination with the event horizon of the sink hole. It's as if a cosmic force has distorted her vision, bending the light around the towering {thing:pile-of-dishes:pile of dishes} and creating a mesmerizing lens effect.",
            ],
          },
        },
      ],
    },
    {
      id: "pick-up-pack-of-tea-bags",
      type: "random",
      matchesAction: {
        oneOf: "pick-up",
      },
      matchesObjects: [
        {
          oneIdOf: "pack-of-tea-bags",
        },
      ],
      responses: {
        "hardy-grow": [
          "Ah, the delightful aroma of Earl Grey! A perfect choice for a soothing cup of tea.",
        ],
        "isa-ruff": [
          "Now this is what I call a cuppa! Earl Grey, the elixir of serenity and comfort.",
        ],
      },
      effects: [
        {
          type: "pick-up-thing-from-scene",

          thingId: "pack-of-tea-bags",
        },
      ],
    },
    {
      type: "effect-or-random",
      id: "look-at-sideboard",
      matchesAction: {
        oneOf: "look-at",
      },
      matchesObjects: [{ oneIdOf: "sideboard" }],
      responses: {
        "hardy-grow": [
          "Ah, what a splendid sideboard we have here. A testament to fine craftsmanship and elegance.",
          "Remarkable, isn't it? This sideboard exudes a sense of refinement and timeless beauty.",
          "One cannot help but admire the exquisite design and intricate details of this sideboard.",
          "A sideboard of such grace and sophistication truly complements the essence of this kitchen.",
          "I daresay, this sideboard is a testament to the impeccable taste and discerning eye of its owner.",
          "The fine craftsmanship and attention to detail evident in this sideboard is truly commendable.",
          "I find myself captivated by the timeless elegance and charm of this remarkable sideboard.",
          "What a splendid addition this sideboard makes to the overall aesthetic of this kitchen space.",
          "One can appreciate the thoughtfulness and care put into selecting such a distinguished sideboard.",
          "The presence of this distinguished sideboard adds a touch of refinement to the culinary ambiance.",
        ],
        "isa-ruff": [
          "Blimey, would ya look at that fancy sideboard? Fit for a royal, it is!",
          "Cor, that's a proper posh piece of furniture, innit? Bet it's hiding some hidden treasures!",
          "Well, ain't this sideboard a sight for sore eyes? It's got more class than the Queen herself!",
          "Oi, check out that sideboard, all elegant and fancy. Makes me feel like a proper lady!",
          "I reckon this sideboard has seen its fair share of tea parties and posh gatherings.",
          "Oh my days, that sideboard's a bloomin' masterpiece! It's got charm like no other!",
          "Look at that posh sideboard, all dolled up with fancy decorations. Makes me feel right at home!",
          "Blimey, I'd give me right arm to have a sideboard as classy as that. It's a real stunner!",
          "I can almost hear the whispers of history coming from that sideboard. Bet it's got stories to tell!",
          "Well, ain't this sideboard a proper work of art? It's like a glimpse into a bygone era!",
        ],
      },
      effects: [
        {
          type: "add-paragraph-to-scene",

          paragraphs: [
            "As {player:hardy-grow:Hardy} and {player:isa-ruff:Isa}'s gaze shifts from the sink to the {thing:sideboard:sideboard}, a glimmer of excitement dances in their eyes. Amidst the chaos, they spot a familiar package nestled among the clutter—a {thing:pack-of-tea-bags:delightful pack of Earl Grey tea}.",
          ],
        },
      ],
    },
    {
      type: "walk-to",
      id: "walk-to-office",
      matchesAction: {
        oneOf: "walk-to",
      },
      matchesObjects: [
        {
          oneIdOf: "office",
        },
      ],
      responses: [
        "The office, a den of intrigue, housed a cluttered desk, a worn sofa, and an air of enigmatic possibilities.",
      ],
    },
  ],
};
