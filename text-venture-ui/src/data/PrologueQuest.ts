import { TextActionNone } from "../model/TextAction";
import { TextThing } from "../model/TextObject";
import { TextVentureJson } from "../model/TextVenture";
import { GithubUrl } from "./DefaultSettings";

const a100Things = Array.from(Array(100).keys()).map((idx) => {
  let no = idx + 1;
  let thing: TextThing = {
    type: "thing",
    description:
      "Blimey, someone 'ad to test the bleedin' inventory, didn't they? Guess who volunteered? Now I'm stuck luggin' 'round a hundred things like a bloomin' pack mule. Shitty programmer, I tell ya!",
    id: "thing-" + no,
    name: "Thing " + no + " of 100 with a long name filling up the inventory",
    interactions: [],
  };
  return thing;
});

export const PrologueQuest: TextVentureJson = {
  type: "venture",
  id: "prologue-quest",
  name: "Prologue",
  description: "A Guide to Unravel the Secrets beyond the Milch Glass Door",
  anecdote: {
    quote:
      "In my illustrious career as a Holonovel author, I've penned countless thrilling adventures, but none quite like the time I found myself face-to-fang with my own creation. Picture this: I was knee-deep in writing my latest masterpiece, 'The Wrath of Nebula Beasts', when suddenly, I found myself inside the very holo-monster I had conjured up.",
    chronicler: "Stellar Havoc",
    source: "Virtual Adventures That Might Kill You",
  },
  logbookMaxLength: 1000,
  logbook: [],
  logbookTitle: "Logbook",
  commandMode: "action",
  links: [
    {
      type: "link",
      id: "github",
      url: GithubUrl,
    },
    {
      type: "link",
      id: "home",
      url: "/",
      isInternal: true,
    },
  ],
  actions: [
    TextActionNone,
    {
      id: "look-at",
      name: "Look at",
      minCount: 1,
      maxCount: 1,
    },
    {
      id: "walk-to",
      name: "Walk to",
      minCount: 1,
      maxCount: 1,
    },
    {
      id: "talk-to",
      name: "Talk to",
      minCount: 1,
      maxCount: 1,
    },
    {
      id: "pick-up",
      name: "Pick up",
      minCount: 1,
      maxCount: 1,
    },
    {
      id: "give",
      name: "Give",
      preposition: " to ",
      minCount: 2,
      maxCount: 2,
    },
    {
      id: "use",
      name: "Use",
      preposition: " with ",
      minCount: 1,
      maxCount: 999,
    },
  ],
  interactions: [
    {
      id: "default-pick-up",
      type: "random",
      matchesAction: {
        oneOf: "pick-up",
      },
      matchesObjects: [{ oneTypeOf: "thing" }],
      responses: [
        "Not my style, thanks.",
        "Already have one, no need.",
        "Too heavy for me, sorry.",
        "Not worth the effort, really.",
        "Can't carry any more things.",
        "Looks broken, best leave it.",
        "Not my cup of tea.",
        "Too dirty to handle, sorry.",
        "No space in my inventory.",
        "Not interested, let it be.",
        "Don't need it, thanks anyway.",
        "Already got enough clutter.",
        "It's cursed, better avoid.",
        "Leave it for someone else.",
        "Got no use for it.",
        "Not valuable enough, sorry.",
        "It's too fragile, unfortunately.",
        "Better left untouched, really.",
        "Not part of my quest.",
        "Sorry, no room for it.",
      ],
    },
    {
      id: "default-look-at",
      type: "look-at",
      matchesAction: {
        oneOf: "look-at",
      },
      matchesObjects: [
        {
          any: true,
        },
      ],
      responses: [
        "The item appears utterly useless.",
        "Looking at it reveals no purpose.",
        "It seems to serve no function.",
        "There's no apparent use for it.",
        "Examining it yields no value.",
        "The item offers no practicality.",
        "It's just a pointless object.",
        "No practical use can be found.",
        "It serves no discernible purpose.",
        "Inspecting it reveals futility.",
        "The item seems utterly redundant.",
        "It's nothing more than clutter.",
        "Examining it uncovers uselessness.",
        "There's no meaningful utility to it.",
        "It's devoid of any useful function.",
        "The item is utterly impractical.",
        "It serves no tangible purpose.",
        "Looking at it reveals futility.",
        "It's a mere decorative piece.",
        "The item is simply worthless.",
      ],
    },
    {
      id: "default-give-person-to-no-slavery",
      type: "random",
      matchesAction: {
        oneOf: "give",
      },
      matchesObjects: [
        {
          oneTypeOf: ["player", "person"],
        },
        {
          any: true,
        },
      ],
      responses: [
        "Sorry, but people aren't tradeable.",
        "We don't engage in human transactions.",
        "We don't condone any form of slavery.",
        "People can't be given away.",
        "We respect the freedom of individuals.",
        "We don't support human commodification.",
        "We value human rights and dignity.",
        "People are not objects to be transferred.",
        "We promote equality and autonomy.",
        "Sorry, but that's not ethically acceptable.",
        "We encourage respecting personal autonomy.",
        "Individuals cannot be treated as possessions.",
        "We believe in the inherent worth of all people.",
        "We uphold principles of human freedom.",
        "Sorry, but that's not within our moral framework.",
        "We prioritize human dignity and self-determination.",
        "We don't engage in any form of human trafficking.",
        "People deserve respect and agency.",
        "Sorry, but that goes against our principles.",
        "We advocate for the rights of individuals.",
      ],
    },
    {
      id: "default-give-own-thing-to-person",
      type: "random",
      matchesAction: { oneOf: "give" },
      matchesObjects: [{ playerHasIt: true }, { oneTypeOf: "person" }],
      responses: [
        "Are you sure you want to part with that? They might need it later.",
        "It might be wise to hold onto that. They could find it useful in the future.",
        "Consider keeping that item. They may have a use for it later on.",
        "Think twice before giving it away. It could come in handy for them later.",
        "Are you certain they won't require it later? It might be best to hold off.",
        "They may find themselves in need of that item later. Perhaps reconsider.",
        "Be cautious about giving it away. They might regret not having it later on.",
        "Think about the potential future use. It might be better to keep it for now.",
        "Consider the long-term benefit. They might find value in that item later.",
        "Be mindful of their future needs. They might thank you for keeping it.",
        "Keep in mind that they might require it later. It's worth considering.",
        "Think about the possible scenarios. They might regret not having it later on.",
        "It's worth considering if they might need it later. Maybe hold onto it for now.",
        "Reflect on their potential future needs. They might benefit from keeping it.",
        "Think about the possible future situations. It might be wise to retain it.",
        "Consider the practicality of giving it away. They might miss it later on.",
        "Be aware of their potential future requirements. It's something to think about.",
        "Think about the consequences. They might find themselves needing it later.",
        "Consider the future circumstances. They might regret not having it available.",
        "Take a moment to ponder. They might have a use for it down the road.",
      ],
    },
    {
      id: "default-give-foreign-thing-to-person",
      type: "random",
      matchesAction: {
        oneOf: "give",
      },
      matchesObjects: [
        {
          any: true,
        },
        {
          oneTypeOf: ["player", "person"],
        },
      ],
      responses: [
        "You can't give something you don't have.",
        "You don't possess that item to give.",
        "Sorry, but that item isn't in your possession.",
        "You'll need to acquire it first before giving.",
        "You don't have the authority to give that.",
        "That item isn't part of your inventory.",
        "You must obtain it before offering it.",
        "You can't give what you don't own.",
        "You need to find it before giving.",
        "Sorry, but it's not yours to give.",
        "You can't give something you lack.",
        "You don't have access to that item.",
        "That item isn't under your control.",
        "You'll need to obtain it elsewhere first.",
        "You can't give what you haven't obtained.",
        "That item is beyond your possession.",
        "Sorry, but it's not in your ownership.",
        "You'll need to acquire it before offering.",
        "That item isn't part of your belongings.",
        "You need to find it before giving it away.",
      ],
    },
    {
      id: "default-use-5-objects",
      type: "random",
      matchesAction: { oneOf: "use" },
      matchesObjects: [
        { any: true },
        { any: true },
        { any: true },
        { any: true },
        { any: true },
      ],
      style: "red-alert",
      responses: [
        "Those items don't seem compatible.",
        "You can't combine those items.",
        "That combination yields no results.",
        "The items resist your attempt.",
        "Those items refuse to cooperate.",
        "Nothing happens when you try.",
        "The items remain unaffected.",
        "Those items don't belong together.",
        "That combination doesn't make sense.",
        "Sorry, but that's not possible.",
        "The items resist your efforts.",
        "You can't use those together.",
        "No synergy exists between them.",
        "Those items repel each other.",
        "The combination yields no outcome.",
        "The items defy your intentions.",
        "That's an incompatible combination.",
        "The items simply don't work together.",
        "You can't force them to combine.",
        "It seems those items can't cooperate.",
      ],
    },
    {
      id: "default-interaction",
      type: "random",
      style: "red-alert",
      matchesAction: {
        oneOf: [
          "none",
          "open",
          "close",
          "push",
          "pull",
          "walk-to",
          "pick-up",
          "talk-to",
          "look-at",
          "turn-on",
          "turn-off",
          "give",
        ],
      },
      matchesObjects: "any",
      responses: [
        "That's not even remotely possible.",
        "I'm sorry, but that defies logic.",
        "I'm afraid I can't comply.",
        "That command is beyond comprehension.",
        "I don't think reality allows that.",
        "I'm scratching my head in confusion.",
        "You've ventured into absurdity now.",
        "That's a command from another dimension.",
        "I'm sorry, but I can't comply with that nonsense.",
        "I'm not equipped to handle that level of absurdity.",
        "Did you accidentally stumble into a surreal universe?",
        "I'm afraid your command violates the laws of nature.",
        "That's like asking a fish to ride a bicycle.",
        "I'm at a loss for words with that command.",
        "I'm sorry, but my programming can't process that.",
        "I wish I could comply, but that's simply impossible.",
        "That's beyond the scope of this text venture.",
        "You're exploring uncharted realms of absurdity now.",
        "I'm afraid that command defies all known conventions.",
        "You've reached the outer limits of nonsensical commands.",
      ],
    },
  ],
  currentPlayerId: "hardy-grow",
  players: [
    {
      type: "player",
      id: "hardy-grow",
      name: "Hardy Grow",
      shortName: "Mr. Grow",
      description:
        "Hardy Grow: A quintessentially English gentleman with impeccable attire, possessed of an air of mild perplexity and subtle intrigue.",
      interactions: [
        {
          type: "random",
          id: "talk-to-self",
          matchesPlayer: "hardy-grow",
          matchesAction: {
            oneOf: "talk-to",
          },
          matchesObjects: [
            {
              oneIdOf: "hardy-grow",
            },
          ],
          responses: [
            "Ah, Hardy, my good fellow, always there to lend yourself a listening ear, aren't you?",
            "Now, now, Hardy, let's gather our thoughts and make sense of this tangled web.",
            "Hardy, old chap, you've dealt with stranger cases before. Don't lose your nerve now.",
            "Well, Hardy, it seems we've stumbled upon quite the conundrum. Time to put on our thinking cap!",
            "Oh, Hardy, you witty devil, always finding humor in the most peculiar situations.",
            "Now, Hardy, let's not jump to conclusions. Patience is key in this line of work.",
            "Hardy, my dear fellow, we must stay focused. The truth is just within our grasp.",
            "Well, well, Hardy, looks like we've stumbled upon a clue worth investigating further.",
            "Ah, Hardy, the twists and turns of this case are enough to make one's head spin.",
            "Now, now, Hardy, let's not let frustration get the better of us. We shall crack this case yet.",
            "Hardy, my inquisitive companion, sometimes the answers lie in the most unexpected places.",
            "Ah, Hardy, the thrill of unraveling a mystery never fails to ignite our detective spirit.",
            "Well, well, Hardy, it appears we've found ourselves knee-deep in yet another puzzling situation.",
            "Now, now, Hardy, let's approach this with a clear mind. Our deductive skills shall prevail.",
            "Ah, Hardy, the art of investigation requires both logic and intuition. Trust your instincts.",
            "Hardy, my old friend, we've faced far greater challenges in our illustrious career. We shall overcome this one too.",
            "Now, Hardy, let's put our heads together and piece this puzzle back into coherence.",
            "Ah, Hardy, the thrill of solving a mystery is surpassed only by the satisfaction of a job well done.",
            "Hardy, my dear fellow, the path to truth is often winding, but we shall navigate it with our usual finesse.",
            "Now, now, Hardy, let's marshal our thoughts and devise a strategy to crack this perplexing case.",
          ],
        },
        {
          type: "random",
          id: "look-at-self",
          matchesPlayer: "hardy-grow",
          matchesAction: {
            oneOf: "look-at",
          },
          matchesObjects: [
            {
              oneIdOf: "hardy-grow",
            },
          ],
          responses: [
            "Ah, Hardy, my good fellow, always there to lend yourself a scrutinizing gaze, aren't you?",
            "Well, well, Hardy, taking a moment to reflect upon your impeccable detective skills, are we?",
            "Now, now, Hardy, let's have a little conversation with our own thoughts, shall we?",
            "Hardy, my dear chap, looking inwards for inspiration, are we?",
            "Ah, Hardy, the reflection in the mirror reveals a steadfast and astute detective.",
            "Now, Hardy, let's meet our own gaze and reaffirm our dedication to the truth.",
            "Hardy, my old friend, the face staring back at us holds the key to unlocking mysteries.",
            "Well, well, Hardy, a moment of self-appraisal to ensure we're at the top of our investigative game.",
            "Ah, Hardy, the mirror reveals a countenance of unwavering determination.",
            "Now, now, Hardy, a glance towards oneself to gather the resolve needed for the challenges ahead.",
            "Hardy, my trusty companion, assessing our own reflection for any signs of hidden insight.",
            "Well, well, Hardy, seeking answers within the depths of our own discerning eyes.",
            "Ah, Hardy, the reflection unveils a mind brimming with analytical prowess.",
            "Now, Hardy, let us confront our own image and reaffirm our dedication to truth and justice.",
            "Hardy, my inquisitive counterpart, looking inward for guidance amidst the enigmatic currents of this case.",
            "Ah, Hardy, the mirrored image reflects a detective honed in skill and experience.",
            "Now, now, Hardy, a glimpse at oneself to gather strength and unravel the mysteries that lie ahead.",
            "Hardy, my astute compatriot, the mirror reveals the unwavering resolve of a true investigator.",
            "Well, well, Hardy, a moment of self-reflection to sharpen our senses for the tasks at hand.",
            "Ah, Hardy, gazing upon oneself to draw forth the tenacity needed to navigate this perplexing journey.",
          ],
        },
        {
          type: "look-at-player",
          id: "look-at-isa",
          matchesPlayer: "hardy-grow",
          matchesAction: {
            oneOf: "look-at",
          },
          matchesObjects: [
            {
              oneIdOf: "isa-ruff",
            },
          ],
          responses: [
            "Ah, Isa, my dependable partner, ready to unleash your punk-rock fury when the situation turns sour, I hope?",
            "Well, well, Isa, let's hope those rebellious instincts of yours kick in when the going gets tough.",
            "Now, now, Isa, with your fiery spirit, I trust you'll be right by my side if things take a turn for the worse.",
            "Isa, my punk-rock comrade, counting on your fierce determination to rise to the occasion when the situation gets ugly.",
            "Ah, Isa, your colorful presence reminds me that I can rely on your unwavering support when the chips are down.",
            "Now, Isa, I can't help but imagine your rebellious nature coming to the forefront if the situation becomes dire.",
            "Isa, my spirited companion, I'm confident that your punk-rock energy will kick in when things start to unravel.",
            "Well, well, Isa, your mere presence assures me that I won't be facing the ugliness alone if it comes knocking.",
            "Ah, Isa, your punk-rock persona hints at the fierce resilience you possess when adversity rears its head.",
            "Now, now, Isa, your unconventional charm gives me hope that you'll be ready to jump into action when things go awry.",
            "Isa, my rock 'n' roll ally, I anticipate your involvement when the situation escalates into chaos.",
            "Well, well, Isa, I can't help but rely on your punk-rock spirit to shine through when things take a turn for the worse.",
            "Ah, Isa, the vibrant colors in your hair reflect the bravery I know you possess in challenging circumstances.",
            "Now, Isa, your punk-rock essence serves as a reminder that I have a fierce ally to rely on when things get ugly.",
            "Isa, my spirited partner, I have faith in your ability to step up and lend your punk-rock prowess when the going gets tough.",
            "Well, well, Isa, your rebellious nature hints at the strength I know you possess to face the ugliness head-on.",
            "Ah, Isa, your punk-rock attitude assures me that you'll be right there with me if the situation takes a turn for the worse.",
            "Now, now, Isa, I find solace in the thought of your fierce spirit kicking in when the situation becomes dire.",
            "Isa, my fiery friend, I trust that your punk-rock energy will ignite when we face adversity.",
            "Well, well, Isa, your presence alone emboldens me, knowing that I won't face the ugliness alone with you by my side.",
          ],
        },
        {
          type: "random-talk-to",
          id: "talk-to-isa",
          matchesPlayer: "hardy-grow",
          matchesAction: {
            oneOf: "talk-to",
          },
          matchesObjects: [
            {
              oneIdOf: "isa-ruff",
            },
          ],
          questions: [
            "My dear, might I humbly request your assistance in this delicate affair?",
            "Would you be so kind as to lend your expertise in navigating these treacherous waters?",
            "Could I trouble you for your invaluable insights in this rather intricate matter?",
            "Might I implore your assistance in unraveling the intricacies of this perplexing situation?",
            "Would you be so gracious as to lend your discerning eye to shed light on this conundrum?",
            "My dear, I find myself in need of your wise counsel in this sensitive predicament.",
            "Could I rely on your astute judgment to navigate this delicate tightrope?",
            "Might I seek your guidance in treading the fine line of diplomacy in this matter?",
            "Would you be willing to offer your invaluable assistance in these sensitive affairs?",
            "My dear, your wisdom is unparalleled. Could you bestow upon me your guidance in this delicate matter?",
            "Might I call upon your expertise to help me navigate these thorny intricacies?",
            "Could I prevail upon your sharp intellect to assist me in this delicate puzzle?",
            "My dear, I find myself in need of your deft touch to handle this sensitive situation.",
            "Would you be so kind as to lend your aid in these delicate negotiations?",
            "Might I lean upon your knowledge and experience to navigate this intricate web?",
            "Could I trouble you to provide your discerning insights on this delicate matter?",
            "My dear, your perspective is highly valued. Could you assist me in this delicate affair?",
            "Might I enlist your aid in delicately maneuvering through these treacherous waters?",
            "Would you be willing to lend your expertise in this intricate dance of diplomacy?",
            "My dear, your guidance is indispensable. Might I request your assistance in this delicate endeavor?",
          ],
          responses: [
            "Right, listen up, mate. I'll sort this mess out for ya.",
            "Ain't no worries, love. I'll 'ave your back in this pickle.",
            "Oi, don't you fret, sunshine. I'll lend ya a hand, no questions asked.",
            "Look 'ere, I'll give ya a leg up in this dodgy business.",
            "No need to panic, guv'nor. I'll 'ave a crack at fixin' it.",
            "You just leave it to me, darlin'. I'll work me magic.",
            "'Ave no fear, I'll take care of this sticky situation.",
            "Don'tcha worry, mate. I'll sort it out in a jiffy.",
            "Leave it with me, luv. I'll 'andle it like a pro.",
            "Consider it done, my friend. I'll see to it right proper.",
            "No need to thank me, sunshine. I'll lend ya a helping hand.",
            "Oi, don't stress, darlin'. I'll make it right as rain.",
            "Trust me, guv'nor. I'll come through for ya, no doubts.",
            "I'll put me best foot forward, mate. You can count on me.",
            "You can rest easy, love. I'll sort this out, no problemo.",
            "No need to fret, luv. I'll 'ave it all under control.",
            "'Ave faith in me, mate. I'll work me magic for ya.",
            "Don'tcha worry, darlin'. I'll take care of ya, no worries.",
            "You just leave it to ol' Isa. I'll 'ave a solution in no time.",
            "Consider it done, guv. I'll sort it out, no sweat.",
          ],
        },
        {
          id: "talk-to-person",
          type: "random-talk-to",
          matchesPlayer: "hardy-grow",
          matchesAction: { oneOf: "talk-to" },
          matchesObjects: [{ oneTypeOf: "person" }],
          questions: [
            "Hey there, how's the day?",
            "What's new in your world?",
            "Any interesting cases lately, mate?",
            "Seen anything peculiar around?",
            "How's the detective life treating you?",
            "Care to share any thrilling stories?",
            "What's the latest gossip, eh?",
            "Any mysterious clients crossed paths?",
            "Got any leads on unsolved mysteries?",
            "How's the sleuthing business going?",
            "Discover any hidden secrets lately?",
            "Find any intriguing clues recently?",
            "Any exciting adventures on horizon?",
            "Tell me, what intrigues you?",
            "Ever encountered a real enigma?",
            "What's your take on riddles?",
            "Any favorite detective novels?",
            "How do you unravel mysteries?",
            "What's your go-to investigative technique?",
            "How do you stay one step ahead?",
          ],
          responses: [
            "Sorry, not in the mood for conversation.",
            "I prefer to be left alone, thanks.",
            "I'd rather not engage right now.",
            "No offense, but I'm not interested.",
            "I'm busy and don't have time to chat.",
            "I'm not looking for a conversation partner.",
            "I prefer solitude over small talk.",
            "Sorry, but I'm not up for talking.",
            "I'd rather keep to myself, if you don't mind.",
            "No need for conversation, I'm good.",
            "I appreciate the offer, but I'll pass.",
            "I'm enjoying some quiet time, sorry.",
            "I'm not in the mood to socialize.",
            "I prefer silence at the moment.",
            "I'd rather not engage with others right now.",
            "Sorry, but I'm not feeling chatty.",
            "I have my own thoughts to ponder.",
            "I'm in my own little world, sorry.",
            "I'm not interested in idle conversation.",
            "I'd rather enjoy my own company.",
          ],
        },
        {
          id: "give-item-to-isa",
          type: "give-item-to",
          matchesPlayer: "hardy-grow",
          matchesAction: {
            oneOf: "give",
          },
          matchesObjects: [
            {
              playerHasIt: true,
            },
            {
              oneIdOf: "isa-ruff",
            },
          ],
          responses: [
            "Here, thought you might like this.",
            "I found something you might need.",
            "Take this, it might come in handy.",
            "I thought this would suit you.",
            "I came across this for you.",
            "This belongs in your hands.",
            "I thought of you when I found this.",
            "Consider this a gift from me.",
            "I thought you'd appreciate this.",
            "I believe this is meant for you.",
            "I found something interesting for you.",
            "This should be in your possession.",
            "I thought you could make use of this.",
            "Take this, it's yours now.",
            "I thought you'd find this intriguing.",
            "I wanted you to have this.",
            "Consider this a little token.",
            "This seemed perfect for you.",
            "I thought this would be useful.",
            "Take it, it's yours to keep.",
          ],
        },
      ],
      things: [
        {
          type: "thing",
          id: "flashlight-empty",
          name: "Empty Flashlight",
          description: "An empty flash light",
          interactions: [
            {
              id: "use-flashlight-empty-with-batteries",
              type: "simple",
              matchesAction: {
                oneOf: "use",
              },
              matchesObjects: [
                {
                  oneIdOf: ["flashlight-empty", "batteries"],
                },
                {
                  oneIdOf: ["flashlight-empty", "batteries"],
                },
              ],
              response: "Oh that's more like it",
              effects: [
                {
                  type: "remove-thing-from-inventory",
                  id: "batteries",
                  dropEffect: true,
                },
                {
                  type: "change-thing-in-inventory",
                  oldId: "flashlight-empty",
                  newId: "flashlight-off",
                  name: "Flashlight (off)",
                  description: "The Flashlight is switched off",
                  dropEffect: true,
                },
              ],
            },
            {
              type: "simple",
              id: "switch-flashlight-on",
              matchesAction: {
                oneOf: "use",
              },
              matchesObjects: [
                {
                  oneIdOf: "flashlight-off",
                },
              ],
              response: "Let there be light",
              effects: [
                {
                  type: "change-thing-in-inventory",
                  oldId: "flashlight-off",
                  newId: "flashlight-on",
                  description: "Flashlight shines bright like the sun",
                  name: "Flashlight (on)",
                  dropEffect: false,
                },
              ],
            },
            {
              type: "simple",
              id: "switch-flashlight-off",
              matchesAction: {
                oneOf: "use",
              },
              matchesObjects: [
                {
                  oneIdOf: "flashlight-on",
                },
              ],
              response: "Let's safe the batteries for later",
              effects: [
                {
                  type: "change-thing-in-inventory",
                  oldId: "flashlight-on",
                  newId: "flashlight-off",
                  name: "Flashlight (off)",
                  description: "The Flashlight is switched off",
                  dropEffect: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "player",
      id: "isa-ruff",
      name: "Isa Ruff",
      shortName: "Isa",
      description:
        "Isa Ruff: A punk-rock rebel, sporting vividly colored hair and an aura of rebellious nonchalance. Safety pin earring and untamed spirit included.",
      interactions: [
        {
          id: "look-at-hardy",
          type: "look-at-player",
          matchesPlayer: "isa-ruff",
          matchesAction: {
            oneOf: "look-at",
          },
          matchesObjects: [
            {
              oneIdOf: "hardy-grow",
            },
          ],
          responses: [
            "About time, take the damn wheel.",
            "You drive, I'm done with this.",
            "Back to you, Mr. Incompetent Detective.",
            "It's your turn, Captain Useless.",
            "Wheel's all yours, Mr. Lame Investigator.",
            "Here, handle it, Mr. Clueless Wonder.",
            "You drive, I'll just roll my eyes.",
            "Returning the wheel, Mr. Detective Extraordinaire.",
            "It's back to your lackluster driving skills.",
            "Fine, you take over, Mr. Ineptitude.",
            "Your turn, Chief Incompetent.",
            "Wheel's yours, Sherlock No-Brains.",
            "Handing it back, Mr. Mediocre Investigator.",
            "Back in your hands, Inspector Inept.",
            "Take it, Mr. Useless Sleuth.",
            "It's all yours, Detective Dullard.",
            "Here, have the wheel, Mr. Imbecile.",
            "You drive, I'll just cringe silently.",
            "Back to you, Captain Clumsy Detective.",
            "Handing it off, Mr. Underwhelming Investigator.",
          ],
        },
        {
          id: "look-at-self",
          type: "look-at",
          matchesPlayer: "isa-ruff",
          matchesAction: {
            oneOf: "look-at",
          },
          matchesObjects: [{ oneIdOf: "isa-ruff" }],
          responses: [
            "What's your problem? Stop staring, creep.",
            "Got a staring problem? Look elsewhere, pal.",
            "What are you gawking at? Buzz off.",
            "Can't handle punk rock? Tough luck, buddy.",
            "Looking for trouble? You found it.",
            "Eyes off, or I'll give you something to remember.",
            "Keep staring, and you'll regret it.",
            "You think you've seen it all? Think again.",
            "What's the matter? Never seen punk before?",
            "Don't make me come over there, you nosy git.",
            "Looking won't get you anywhere. Move along.",
            "Take a picture, it lasts longer. Now scram.",
            "I'm not your entertainment. Quit ogling, weirdo.",
            "What's your deal? Give me some privacy, jeez.",
            "You're not worthy of my punk rock glory.",
            "Don't make me regret letting you look.",
            "You think you're edgy? Please, you're laughable.",
            "You're just another spectator in my punk world.",
            "Looking won't get you any closer, keep dreaming.",
            "I've got better things to do than entertain your gaze.",
          ],
        },
        {
          id: "talk-to-hardy",
          type: "random-talk-to",
          matchesPlayer: "isa-ruff",
          matchesAction: { oneOf: "talk-to" },
          matchesObjects: [{ oneIdOf: "hardy-grow" }],
          questions: [
            "Oi, what's the big idea, mate?",
            "You got a clue what you're doin', guv?",
            "Fancy sharin' some useful info, or am I wastin' me time?",
            "'Ello, 'ave you lost yer marbles?",
            "What's the game, fancy pants?",
            "Got anythin' interestin' to say, or am I gonna nod off?",
            "Lookin' to waste me day or actually get somethin' done?",
            "'Ey, stop dawdlin' and spill the beans, will ya?",
            "Got a proper plan or just wingin' it like a plonker?",
            "'Ave you got any idea what you're blabberin' about?",
            "Lookin' for answers or just givin' me a headache?",
            "Fancy enlightenin' me with somethin' worth me while?",
            "You got a clue how to get us movin', or should I take over?",
            "Time's tickin', mate. Spit it out or I'm movin' on.",
            "Got anythin' important to say or am I stuck 'ere listenin' to ya blabber?",
            "Wake me up when you've got somethin' worth sayin', alright?",
            "'Ey, stop natterin' and get to the point, will ya?",
            "'Ave you got anythin' that's not a load of codswallop?",
            "Time's precious, mate. Make it count or I'm outta 'ere.",
            "What's the plan, Sherlock? 'Cause I ain't got all day.",
          ],
          responses: [
            "Oh, my dear, let's not get our knickers in a twist.",
            "Now, now, there's no need for such a fuss, is there?",
            "Well, isn't this a jolly good start to our conversation?",
            "Let's not be hasty, my dear. Patience is a virtue.",
            "Ah, you're a breath of fresh air, always keeping me on my toes.",
            "My apologies if I've seemed a bit off, old bean. Long day, you know.",
            "Right you are, my dear. Let's dive into the heart of the matter, shall we?",
            "Oh, don't you worry, I've got a few tricks up my sleeve.",
            "Now, let's not jump to conclusions, my dear. All in good time.",
            "Well, isn't this a fascinating turn of events? Pray, do tell.",
            "Ah, the game of life, full of mysteries and surprises. Quite thrilling, wouldn't you say?",
            "My dear, you always manage to bring a smile to my face. Quite refreshing.",
            "You're quite the inquisitive one, aren't you? I admire your curiosity.",
            "Ah, the joy of unraveling secrets. Let's see where this leads us, shall we?",
            "No need to fret, my dear. We'll uncover the truth in due course.",
            "You've caught me at a most opportune time, my dear. Let's dive into the depths of conversation.",
            "Ah, the art of small talk. A delightful dance we engage in, wouldn't you agree?",
            "Well, isn't this a splendid opportunity for some intellectual banter?",
            "Fear not, my dear, for I'm here to guide us through this maze of uncertainty.",
            "How delightful it is to engage in a tête-à-tête with a mind as sharp as yours.",
          ],
        },
        {
          id: "talk-to-person",
          type: "random-talk-to",
          matchesPlayer: "isa-ruff",
          matchesAction: { oneOf: "talk-to" },
          matchesObjects: [{ oneTypeOf: "person" }],
          questions: [
            "Hey, got any new punk rock anthems to recommend?",
            "What's your favorite punk concert memory?",
            "Any cool punk fashion trends catching your eye lately?",
            "Ever had an epic mosh pit experience?",
            "Do you have a favorite punk band that inspires you?",
            "What's the craziest punk gig you've ever been to?",
            "Any punk rock documentaries worth watching?",
            "Got any punk DIY tips to share?",
            "What's the story behind your punk hairstyle?",
            "Do you collect punk memorabilia or vinyl records?",
            "Any punk rock legends you'd love to meet?",
            "What's your go-to punk rebellion anthem?",
            "Ever participated in punk activism or protests?",
            "Have you discovered any underground punk bands lately?",
            "What's your take on the intersection of punk and politics?",
            "Any punk rock heroes who inspire your style?",
            "Do you have a favorite punk zine or magazine?",
            "What draws you to the raw energy of punk music?",
            "Got any punk rock recommendations for a newbie?",
            "Have you ever dabbled in punk DIY fashion or jewelry-making?",
          ],
          responses: [
            "Sorry, not interested in engaging right now.",
            "I prefer to keep to myself, thank you.",
            "I'd rather not have a conversation, if you don't mind.",
            "No offense, but I'm not up for talking.",
            "I'm not in the mood for social interaction at the moment.",
            "I appreciate the offer, but I'd rather be left alone.",
            "I'm not looking to engage with others right now.",
            "I'm busy and don't have the time to chat.",
            "I prefer solitude over small talk, if you understand.",
            "I'm not in the mood for idle conversation, sorry.",
            "No need for conversation, I'm content in my own thoughts.",
            "I'm enjoying some quiet time, if you don't mind.",
            "I'm not interested in socializing at this time.",
            "I'd rather have some peace and quiet, thanks.",
            "I prefer to keep my own company for now.",
            "I'm not feeling chatty, if you catch my drift.",
            "I'd rather have some alone time, if you don't object.",
            "I'm in my own little world at the moment, sorry.",
            "I'm not interested in engaging with others right now.",
            "I'd rather enjoy some silence, if that's alright.",
          ],
        },
        {
          id: "give-item-to-hardy",
          type: "give-item-to",
          matchesPlayer: "isa-ruff",
          matchesAction: {
            oneOf: "give",
          },
          matchesObjects: [
            {
              playerHasIt: true,
            },
            {
              oneIdOf: "hardy-grow",
            },
          ],
          responses: [
            "Take this, if you must.",
            "Here, don't screw it up.",
            "I found this, for you.",
            "I don't need it, you can.",
            "Take it, but don't expect gratitude.",
            "Fine, have this useless thing.",
            "You'll probably mess it up.",
            "I don't want it, you take.",
            "Here, but don't get attached.",
            "I found this, it's yours.",
            "I don't care what you do with it.",
            "Just take it and be gone.",
            "I thought you might need this, sadly.",
            "I don't see the point, but here.",
            "You'll probably lose it anyway.",
            "This is for you, reluctantly.",
            "You're responsible for this now.",
            "Don't expect any thanks, ever.",
            "Take it, and don't bother me.",
            "I found this, don't break it.",
          ],
        },
      ],
      things: [
        {
          type: "thing",
          description: "A pink baseball bat, aka Pink Batty",
          id: "pink-batty",
          name: "Pink Batty",
          interactions: [
            {
              type: "random",
              id: "look-at-pink-batty",
              matchesPlayer: "isa-ruff",
              matchesAction: {
                oneOf: "look-at",
              },
              matchesObjects: [
                {
                  oneIdOf: "pink-batty",
                },
              ],
              responses: [
                "Oh, 'ave a look at Pink Batty, innit she a beaut? This 'ere pink baseball bat's me trusty sidekick, always by me side. She's got a bit o' sass, she does. The perfect blend of style and power, ready to take on any trouble that comes me way. Me and Pink Batty, we're a force to be reckoned with. So, if ya mess with me, prepare to meet Pink Batty, mate. She'll knock ya outta the park, she will!",
              ],
            },
            {
              type: "random",
              id: "do-not-give-pink-batty-away-bloke",
              matchesAction: {
                oneOf: "give",
              },
              matchesObjects: [
                {
                  oneIdOf: "pink-batty",
                },
                {
                  any: true,
                },
              ],
              responses: [
                "Oi, 'ands off me Pink Batty, ya cheeky git!",
                "Whoa there, mate! Pink Batty's me pride and joy, can't 'ave ya snatchin' 'er away!",
                "Back off, sunshine! Pink Batty's stayin' right where she belongs, in me 'ands.",
                "Think ya can just grab Pink Batty? Think again, luv. She's mine, all mine!",
                "Oi, keep yer paws off Pink Batty! She's like an extension of meself, ya know?",
                "No way, mate! Pink Batty's part of me identity. Find yer own weapon!",
                "Hands off Pink Batty, or I'll give ya a taste of 'er swing!",
                "Oi, that's not on! Pink Batty's sacred to me, like a proper family heirloom.",
                "Step away from Pink Batty, unless ya fancy a boppin' on the noggin!",
                "Oi, that's a big no-no! Pink Batty's off-limits, and that's the end of it.",
                "Think twice before messin' with me and Pink Batty. We're a package deal, ya see?",
                "Oi, keep yer mitts away from Pink Batty, unless ya wanna feel 'er wrath!",
                "Back up, pal! Pink Batty's me partner in crime, and she's not up for grabs.",
                "Hands off Pink Batty, unless ya fancy a swift whack from me!",
                "Oi, don't even think about swipin' Pink Batty. She's me loyal companion.",
                "No chance, mate! Pink Batty's bonded to me like glue. Find yerself another weapon.",
                "Oi, that's a bad move! Pink Batty's sacred territory, reserved for me and me alone.",
                "Step back, mate! Pink Batty's got a special place in me heart, and that's where she stays.",
                "Hands off Pink Batty, or you'll be dealin' with me and me fierce London spirit!",
                "No way, sunshine! Pink Batty's off-limits, and I won't budge an inch on that matter!",
              ],
            },
            {
              type: "random-talk-to",
              id: "use-pink-batty-with-hardy",
              matchesPlayer: "isa-ruff",
              matchesAction: {
                oneOf: "use",
              },
              matchesObjects: [
                {
                  oneIdOf: "pink-batty",
                },
                {
                  oneIdOf: "hardy-grow",
                },
              ],
              style: "red-alert",
              responseIdx: 1,
              questions: [
                "Take that, ya numpty! Pink Batty packs a mean swing!",
                "Get ready for a taste of Pink Batty's power, Hardy!",
                "Say hello to Pink Batty, 'ard and fast!",
                "Whack! Pink Batty strikes again, right on target!",
                "Pink Batty's here to teach ya a lesson, Hardy!",
                "Watch out, mate! Pink Batty's about to make contact!",
                "Feel the might of Pink Batty, Hardy!",
                "Pink Batty's swingin' for the fences, and you're the ball!",
                "Here comes Pink Batty, givin' ya a taste of her pink fury!",
                "Duck and cover, Hardy! Pink Batty's on the prowl!",
                "Prepare yourself for a Pink Batty-powered wallop!",
                "Hold on tight, Hardy! Pink Batty's got some serious force!",
                "Incoming Pink Batty attack! Brace yourself!",
                "Bam! Pink Batty strikes with precision!",
                "Pink Batty's makin' her move, and you're in her path!",
                "Get ready for a world of hurt, courtesy of Pink Batty!",
                "Pink Batty's swingin' like there's no tomorrow!",
                "Hardy, meet Pink Batty. She's got a bone to pick with ya!",
                "Hope you're ready, 'cause Pink Batty's got a score to settle!",
                "With Pink Batty in me 'ands, there's no escapin' her powerful swing!",
              ],
              responses: [
                "Whoa, Isa! Easy there with Pink Batty!",
                "Ouch! Alright, alright, I surrender! No need for Pink Batty!",
                "Watch it, Isa! Pink Batty means business, doesn't she?",
                "Alright, Pink Batty, let's not get carried away now!",
                "Careful with Pink Batty, Isa! I'd rather keep my bones intact!",
                "I get it, Isa! Pink Batty is a force to be reckoned with!",
                "I'll admit, Pink Batty knows how to make an impression!",
                "Hold on, Isa! Is Pink Batty your secret weapon or something?",
                "Okay, okay, Pink Batty, I get the point! You're fierce!",
                "Easy there, Isa! Pink Batty seems determined to knock me out!",
                "I never thought I'd say this, but I fear Pink Batty!",
                "Isa, remind me not to mess with you and Pink Batty!",
                "Pink Batty strikes again! I swear, she's got a mind of her own!",
                "Alright, Pink Batty, let's call it a truce, shall we?",
                "You and Pink Batty make quite the intimidating duo, Isa!",
                "Pink Batty's got some serious power! I better watch my step.",
                "Ah, the wrath of Pink Batty! I'll be more cautious next time.",
                "I see Pink Batty's not to be taken lightly. Lesson learned!",
                "Okay, Pink Batty, you win this round. Consider me impressed!",
                "Isa, with Pink Batty by your side, I'd say you're unbeatable!",
              ],
            },
            {
              type: "random",
              id: "do-not-use-bink-batty-lightly",
              matchesPlayer: "isa-ruff",
              matchesAction: {
                oneOf: "use",
              },
              matchesObjects: [
                {
                  oneIdOf: "pink-batty",
                },
                {
                  any: true,
                },
              ],
              responses: [
                "No way, mate! Pink Batty is strictly reserved for the deserving!",
                "You must be joking! Pink Batty doesn't swing for just anyone!",
                "Oi, hands off! Pink Batty won't be used for such nonsense!",
                "Not a chance! Pink Batty is for worthy opponents, not random objects!",
                "Sorry, but Pink Batty doesn't take orders from just anyone!",
                "Don't even think about it! Pink Batty has standards, you know!",
                "No can do! Pink Batty has her own sense of justice!",
                "I won't do it! Pink Batty is a weapon of selective destruction!",
                "You're barking up the wrong tree! Pink Batty has her limits!",
                "Absolutely not! Pink Batty's power is reserved for special occasions!",
                "Sorry, mate, but Pink Batty's loyalty lies with me, not your requests!",
                "You've got some nerve! Pink Batty won't be used for your whims!",
                "Nice try, but Pink Batty doesn't answer to anyone but me!",
                "Dream on! Pink Batty won't lift a finger for something unworthy!",
                "Keep dreaming, pal! Pink Batty doesn't take orders from strangers!",
                "Not in a million years! Pink Batty has her own set of rules!",
                "No way, José! Pink Batty stays put unless I say otherwise!",
                "Are you kidding? Pink Batty doesn't play by your rules!",
                "You're delusional if you think Pink Batty will comply with that!",
                "Sorry, but Pink Batty's loyalty lies with me, and she's not interested in your requests!",
              ],
            },
          ],
        },
        {
          type: "thing",
          description: "It's safety pin.",
          id: "safety-pin",
          name: "Safety pin",
          interactions: [],
        },
        {
          type: "thing",
          description: "A fresh pack of batteries",
          id: "batteries",
          name: "Batteries",
          interactions: [],
        },
        ...a100Things,
      ],
    },
  ],
  currentSceneId: "office",
  scenes: [
    {
      type: "scene",
      id: "office",
      name: "Ruff Grow - Private Investigations",
      description:
        "The office, a den of intrigue, housed a cluttered desk, a worn sofa, and an air of enigmatic possibilities.",
      paragraphs: [
        "Behind the milch glass front door, adorned with golden letters spelling out the name of the office, 'Ruff Grow - Private Investigations', beckoned a realm of captivating intrigue. ",
        "Step inside, and you'd find yourself in the heart of their eccentric furniture. The {thing:desk:desk}, weathered and wooden, stood as a testament to time's enduring presence. Its surface bore the weight of countless important documents, scattered among ink stains and the occasional coffee ring. And there, in a corner, resided the {thing:sofa:Chesterfield sofa}, a relic of ancient times. Its worn leather exuded a subtle aroma, a breath that whispered stories of long-forgotten tales and investigations past.",
        "In the cluttered office of Ruff Grow Investigations, {player:hardy-grow:Hardy Grow} scowled at a stack of bills on his {thing:desk:Desk}. Meanwhile, {player:isa-ruff:Isa Ruff} reclined lazily on the {thing:sofa:Chesterfield sofa}, her disheveled appearance perfectly complementing her punk-rock spirit.",
        "As {player:hardy-grow:Hardy} lamented the ever-increasing expenses, he was abruptly interrupted by the entrance of a {person:young-lady:Young Lady}, her red dress contrasting with the sadness in her eyes. With a congenial smile, Hardy welcomed her to 'Ruff Grow Investigation - The Thrilling Text Venture Experience.'",
        "The {person:young-lady:Young Lady} shifted nervously in her red dress, uncertainty evident in her gaze. 'Mr. Grow,' she began, 'I need your help, but I'm not quite sure how this private investigation venture works. Could you please explain it to me?' {player:hardy-grow:Hardy}, ever the gentleman, leaned forward and gestured for her to take a seat.",
      ],
      footnotes: [],
      persons: [
        {
          type: "person",
          id: "young-lady",
          name: "Young Lady",
          description:
            "The young lady, with fiery red dress and eyes filled with melancholy, exuded an intriguing mix of allure and sorrow.",
          interactions: [],
          things: [],
        },
      ],
      things: [
        {
          type: "thing",
          id: "desk",
          description:
            "The desk, worn and weathered, holds the weight of important documents, its surface bearing the marks of Hardy's labor.",
          name: "Desk",
          interactions: [
            {
              type: "random",
              id: "pick-up-desk",
              matchesAction: {
                oneOf: "pick-up",
              },
              matchesObjects: [
                {
                  oneIdOf: "desk",
                },
              ],
              responses: [
                "The desk is far too heavy to lift.",
                "Picking up the desk would be a futile endeavor.",
                "Attempting to lift the desk would strain your back.",
                "The desk is firmly fixed to the floor, resisting any attempts to move it.",
                "Moving the desk would disrupt the order of the office.",
                "Lifting the desk might damage the floor or surrounding furniture.",
                "There's no logical reason to pick up the desk.",
                "The desk serves its purpose best where it is.",
                "Moving the desk would create unnecessary chaos.",
                "The desk is better left undisturbed.",
                "Lifting the desk would achieve nothing of value.",
                "Picking up the desk would be an exercise in futility.",
                "The desk is firmly rooted in its place, defying any attempts to relocate it.",
                "You have no need to lift the desk.",
                "Moving the desk would disrupt the office's organization.",
                "The desk is best appreciated as a stationary fixture.",
                "Lifting the desk would serve no practical purpose.",
                "Attempting to move the desk could lead to injury or damage.",
                "The desk's weight and size make it an impractical object to handle.",
                "Leave the desk be; it's where it belongs.",
              ],
            },
          ],
        },
        {
          type: "thing",
          id: "sofa",
          description:
            "The chesterfield sofa, draped in faded fabric, beckons with a nostalgic charm, offering a seat worn by countless investigations.",
          name: "Chesterfield Sofa",
          interactions: [
            {
              type: "random",
              id: "pick-up",
              matchesAction: {
                oneOf: "pick-up",
              },
              matchesObjects: [
                {
                  oneIdOf: "sofa",
                },
              ],
              responses: [
                "The sofa is far too heavy to lift.",
                "Picking up the sofa would be quite a challenge.",
                "Lifting the sofa would strain your back.",
                "The sofa is firmly anchored to the ground.",
                "Moving the sofa would disrupt the room's aesthetic.",
                "Attempting to lift the sofa would disturb its vintage charm.",
                "There's no need to pick up the sofa.",
                "The sofa is perfectly comfortable where it is.",
                "Moving the sofa would create unnecessary hassle.",
                "The sofa serves its purpose best as a seating arrangement.",
                "Lifting the sofa would accomplish nothing of value.",
                "Picking up the sofa would be an exercise in futility.",
                "The sofa's weight makes it impossible to lift.",
                "You have no reason to lift the sofa.",
                "Moving the sofa would disrupt the room's balance.",
                "The sofa is best enjoyed in its current position.",
                "Lifting the sofa wouldn't serve any practical purpose.",
                "Attempting to move the sofa may damage its structure.",
                "The sofa's size and weight make it impractical to lift.",
                "Leave the sofa be; it's meant for relaxation.",
              ],
            },
          ],
        },
        {
          type: "thing",
          id: "desk-key",
          description:
            "The key, small and metallic, holds the potential to unlock secrets and open doors to hidden realms of possibility.",
          name: "Desk Key",
          interactions: [
            {
              type: "pick-up",
              id: "pick-up-key",
              matchesAction: {
                oneOf: "pick-up",
              },
              matchesObjects: [
                {
                  oneIdOf: "desk-key",
                },
              ],
              responses: [
                "You pick up the key, feeling its weight in your hand. Its significance becomes apparent as you wonder what it may unlock.",
              ],
            },
          ],
        },
      ],
      interactions: [
        {
          type: "talk-to",
          id: "talk-young-lady",
          matchesAction: { oneOf: "talk-to" },
          matchesObjects: [{ oneIdOf: "young-lady" }],
          start: ["help-start", "case-start"],
          dialogs: {
            "help-start": {
              pc: {
                "hardy-grow": {
                  short: "May I clarify the investigation business for you?",
                  paragraphs: [
                    "{player:hardy-grow:Hardy} politely asked the {person:young-lady:Young Lady}, 'If I may, madam, is there anything specific about the investigation process or our services that remains unclear to you? I want to ensure that you have a clear understanding of how we operate and what you can expect from us.'",
                  ],
                },
                "isa-ruff": {
                  short: "Oi, need help with the technicalities?",
                  paragraphs: [
                    "{player:isa-ruff:Isa} asked the {person:young-lady:Young Lady}, with a hint of curiosity in her voice, 'Babe, is there any part of the investigation business that's still a bit fuzzy for ya? Anything you'd like me to break down in more detail?'",
                  ],
                },
              },
              npc:
                "I find myself rather unfamiliar with the intricacies of this investigation business. Would you be so kind as to explain it to me in more detail?",
              next: [
                "help-ask-objects",
                "help-ask-actions",
                "help-ask-inventory",
                "help-ask-logbook",
                "help-end",
              ],
            },
            "help-end": {
              pc: {
                "hardy-grow": {
                  short: "All explained, anything else now?",
                  paragraphs: [
                    "{player:hardy-grow:Hardy} cleared his throat, his voice tinged with a sense of finality. 'Madam, I believe I have sufficiently elucidated the intricacies of the investigation business. Should you require any further clarification or assistance, please do not hesitate to inquire.'",
                  ],
                },
                "isa-ruff": {
                  short:
                    "That's all I can blabber about investigations, innit?",
                  paragraphs: [
                    "{player:isa-ruff:Isa} leaned forward, her voice tinged with a hint of impatience. 'Look, luv, I reckon I've blabbered enough about this investigation thing. If ya need more info or anyfink, just give us a shout, yeah?'",
                  ],
                },
              },
              npc:
                "Regrettably, the {person:young-lady:Young Lady}'s response carried a tinge of disappointment. 'Alas, it is rather disheartening that I won't have the opportunity to delve deeper into the intricacies of the subject matter. I must confess, I was rather keen on acquiring further insights.'",
              next: ["help-start", "case-start"],
              dropIfAsked: true,
            },
            "help-ask-objects": {
              pc: {
                "hardy-grow": {
                  short:
                    "Might I offer a more discourse on the objects at hand?",
                  paragraphs: [
                    "With a polite and inquisitive tone, {player:hardy-grow:Hardy} proposed, 'Might I have the privilege of providing a more elaborate discourse on the objects that currently occupy our attention?'",
                  ],
                },
                "isa-ruff": {
                  short:
                    "Oi, reckon I should break down them bloomin' objects for ya?",
                  paragraphs: [
                    "{player:isa-ruff:Isa}, with hint of impatience, questioned the {person:young-lady:Young Lady}, 'Oi, d'ya reckon I should break down them bloomin' objects for ya? Give ya a proper rundown, innit?'",
                  ],
                },
              },
              npc:
                "'Oh, absolutely. I would be most grateful if you could provide a more detailed explanation of the objects,' the {person:young-lady:Young Lady} responded with sincere enthusiasm, her voice reflecting her genuine curiosity and eagerness to learn.",
              next: ["help-explain-objects"],
            },
            "help-ask-actions": {
              pc: {
                "hardy-grow": {
                  short:
                    "Might I propose a more comprehensive elucidation the actions",
                  paragraphs: [
                    "{player:hardy-grow:Hardy}'s voice took on a polite and inquisitive tone as he addressed the {person:young-lady:Young Lady}. 'If I may humbly suggest, would it be possible for me to offer a more thorough and comprehensive elucidation pertaining to the diverse range of actions that we have at our disposal? I believe that a deeper understanding of these actions would greatly enhance our collective experience within this intriguing text venture.",
                  ],
                },
                "isa-ruff": {
                  short:
                    "Oi, fancy me explainin' the bleedin' actions in more detail?",
                  paragraphs: [
                    "{player:isa-ruff:Isa}'s voice, adorned with a squeak and croak, carried an air of curiosity as she addressed the {person:young-lady:Young Lady}. ''Ere, reckon you fancy me explainin' the bleedin' actions in more detail? I can break 'em down proper for ya, so we're all on the same page, yeah? Let's delve into the nitty-gritty of these actions and 'ave a jolly good time unravelling the secrets of this 'ere text venture!",
                  ],
                },
              },
              npc:
                "The {person:young-lady:Young Lady}'s voice, filled with anticipation and curiosity, responded. 'Absolutely! Your offer is most welcomed. I'm eager to gain a more comprehensive understanding of the actions involved. Thank you for your willingness to provide a detailed explanation.",
              next: ["help-explain-actions"],
            },
            "help-ask-inventory": {
              pc: {
                "hardy-grow": {
                  short:
                    "Might I proffer a more comprehensive elucidation regarding our 'Inventory' system?",
                  paragraphs: [
                    "{player:hardy-grow:Hardy}, posed the question to the {person:young-lady:Young Lady} with a sense of earnestness. 'Might I offer a more thorough explanation of our {style:bold:'Inventory'} system? It's a crucial aspect of our investigative endeavors, and I believe it would greatly benefit your understanding.'",
                  ],
                },
                "isa-ruff": {
                  short:
                    "Oi, fancy me givin' ya a proper breakdown of the bleedin' 'Inventory'?",
                  paragraphs: [
                    "{player:isa-ruff:Isa}, leaned in slightly and asked the young woman with a mischievous glint in her eye, 'Oi, fancy me givin' ya a proper breakdown of the bleedin' {style:bold:'Inventory'}? It's a nifty little system we've got 'ere, and I reckon you'll find it right useful in our detective escapades.'",
                  ],
                },
              },
              npc:
                "The {person:young-lady:Young Lady}, with an air of curiosity and anticipation, 'Oh, certainly. I would greatly appreciate a more detailed explanation of the {style:bold:'Inventory'}, if you would be so kind. It sounds like a fascinating aspect of our detective endeavors.'",
              next: ["help-explain-inventory"],
            },
            "help-ask-logbook": {
              pc: {
                "hardy-grow": {
                  short:
                    "Might I offer a more elaborate elucidation regarding our 'Logbook' system?",
                  paragraphs: [
                    "{player:hardy-grow:Hardy} posed the question to the {person:young-lady:Young Lady}, 'Might I offer a more elaborate elucidation regarding our {style:bold:'Logbook'} system? It would provide you with a comprehensive understanding of its significance in our investigative pursuits.'",
                  ],
                },
                "isa-ruff": {
                  short:
                    "Oi, reckon I should give ya a proper rundown of the bleedin' 'Logbook'?",
                  paragraphs: [
                    "{player:isa-ruff:Isa}, asked the {person:young-lady:Young Lady}, 'Oi, reckon I should give ya a proper rundown of the bleedin' {style:bold:'Logbook'}? It'll give ya all the juicy details about our investigative escapades, luv.'",
                  ],
                },
              },
              npc:
                "The {person:young-lady:Young Lady}, responded, 'Oh, absolutely. I would be most grateful if you could provide a more detailed explanation of the {style:bold:'Logbook'}. It would be wonderful to have a deeper understanding of your investigative records.'",
              next: ["help-explain-logbook"],
            },
            "help-explain-objects": {
              pc: {
                "hardy-grow": {
                  short: "Allow me to elaborate on the objects",
                  paragraphs: [
                    "'I'll explain the four types of objects we have here. First, we have ordinary {style:bold:'Things'}, like this {thing:desk:desk} right here,' {player:hardy-grow:Hardy} gestured towards the wooden {thing:desk:desk}. 'Then, there are {style:bold:'Persons'}, like yourself, the {person:young-lady:Young Lady},' he nodded towards her. 'Of course, we also have the {style:bold:'Players'} themselves, that's {player:isa-ruff:Isa},' he pointed to {player:isa-ruff:Isa}, 'and, well, {player:hardy-grow:me}.'",
                    "{player:hardy-grow:Hardy} paused for a moment, allowing the significance of his words to sink in. Then, he continued, 'We have {style:bold:'Scenes'} too, like this {scene:kitchen:kitchen} we're in right now.' He glanced around to emphasize his point. 'And finally, we have those enigmatic forgotten objects, like the {scene:nimbus:crazy wild world} beyond that milch glass door,' he gestured towards the entrance. 'Trust me, it's best left unexplored.'",
                  ],
                },
                "isa-ruff": {
                  short: "Let me break down them objects!",
                  paragraphs: [
                    "'Alright, listen up, mates! 'Ere's the deal. We 'ave four types of things ya can interact with in this game. First, we got yer ordinary {style:bold:'Bits and Bobs'}, like this 'ere {thing:desk:desk},' {player:isa-ruff:Isa} pointed to the {thing:desk:desk} with a cockney swagger. 'Then, we got {style:bold:'Individuals'}, like this lovely {person:young-lady:Young Lady} right 'ere,' she nodded towards her. 'And of course, we 'ave the {style:bold:'Players'} themselves, that's me, {player:isa-ruff:Isa}, and, well, 'is humble self over there,' she motioned towards {player:hardy-grow:Hardy}.",
                    "Pausing for a moment to catch her breath, {player:isa-ruff:Isa} continued, 'We got {style:bold:'Scenes'} too, like this bleedin' {scene:kitchen:kitchen} over there.' She glanced around, giving it a critical eye. 'And last but not least, we got those mysterious, forgotten objects, like the {scene:nimbus:wild and crazy world} 'idin' behind that milch glass door, which, by the way, I wouldn't go near if I were you. Best left alone, innit?'",
                  ],
                },
              },
              npc:
                "'Ah, splendid! Your thorough explanation of the various object types is truly appreciated,' the {person:young-lady:Young Lady} responded. 'It appears we have a diverse range of elements to engage with in this intriguing text venture. Thank you for shedding light on the subject.'",
              next: [
                "help-ask-actions",
                "help-ask-inventory",
                "help-ask-logbook",
                "help-end",
              ],
              dropIfAsked: true,
            },
            "help-explain-actions": {
              pc: {
                "hardy-grow": {
                  short:
                    "Allow me to elucidate the six fundamental actions at our disposal",
                  paragraphs: [
                    "{style:bold:'Look at'} served as the default action, providing additional information about an object and allowing players to switch between characters. He pointed out a crucial feature located in the top left corner of the screen. With a wave of his hand, he drew attention to the menu that displayed the current character's name and a little box hinting to the inventory in it.",
                    "{style:bold:'Walk to'} facilitated scene transitions, tempting {player:hardy-grow:Hardy} to venture into the {scene:kitchen:kitchen} for snack, despite the mountain of dirty dishes, while the mysterious {scene:nimbus:outside world} remained firmly off-limits.",
                    "{style:bold:'Talk to'} fostered information exchange with other characters,  such as the intriguing {person:young-lady:Young Lady} who just entered the office.",
                    "{style:bold:'Pick up'} facilitated adding items to the inventory (which would be covered later), like the {thing:desk-key:little key} lying on the {thing:desk:desk}",
                    "{style:bold:'Give'} allowed the transfer of objects between characters, and he recalled that {player:isa-ruff:Isa} always had batteries readily available.",
                    "{style:bold:'Use'} permitted amusing interactions with the environment. {player:hardy-grow:Hardy}, being thorough but pragmatic, noted that while these actions were generally effective, other combinations were conceivable but not necessarily recommended.",
                  ],
                },
                "isa-ruff": {
                  short: "'Shall I break down the bleedin' actions for ya?'",
                  paragraphs: [
                    "{player:isa-ruff:Isa} leaned in. 'Right, listen up, mate. Let's break down the bleedin' actions for ya. First off, we got {style:bold:'Look at'}. It's the default action, innit? Gives ya more info 'bout an object and lets ya switch between characters. See that little menu in the top left corner? It tells ya which character ya playin' and gives ya a hint 'bout the inventory, innit.",
                    "Next up, we got {style:bold:'Walk to'}. That's 'ow ya move between scenes. 'Ere, for example, ya can stroll right into the {scene:kitchen:kitchen} if ya fancy a snack, even though there's a mountain of dirty dishes mockin' ya. But remember, the {scene:nimbus:outside world} is off-limits, mate.",
                    "Now, we got {style:bold:'Talk to'}. That's 'ow ya 'ave a chinwag with other characters. Like that fancy {person:young-lady:Young Lady} who just waltzed into the office, innit.",
                    "Then we got {style:bold:'Pick up'}. This one's straightforward, mate. Ya use it to nab things and stash 'em in your inventory. Like that {thing:desk-key:little key} sittin' on the {thing:desk:desk}, for example.",
                    "Next, we got {style:bold:'Give'}. It lets ya pass things between characters. And let me tell ya, I always 'ave me trusty stash of batteries ready for any occasion.",
                    "Lastly, we got {style:bold:'Use'}. That's when things get real interestin'. Ya can interact with the environment in all sorts of ways. But mind ya, mate, not all combinations are a good idea, if ya catch me drift.",
                    "So there ya 'ave it, a proper breakdown of the bleedin' actions. 'ope that clears things up for ya, guv'nor.'",
                  ],
                },
              },
              npc:
                "The {person:young-lady:Young Lady}'s voice carried a sense of excitement as she responded. 'Oh, how utterly fascinating! I must express my heartfelt gratitude for your impeccably detailed explanations of the six actions. It appears we have been bestowed with a delightful array of possibilities to navigate through this thrilling text venture. I am eagerly anticipating the opportunity to delve deeper into the gameplay and unravel the captivating secrets that lie ahead. Thank you ever so much for shedding light on this exhilarating journey.'",
              next: [
                "help-ask-objects",
                "help-ask-inventory",
                "help-ask-logbook",
                "help-end",
              ],
              dropIfAsked: true,
            },
            "help-explain-inventory": {
              pc: {
                "hardy-grow": {
                  short:
                    "Ah, the 'Inventory', a vital component of our adventure...",
                  paragraphs: [
                    "Before delving further, {player:hardy-grow:Hardy} felt obliged to explain the concept of the {style:bold:'Inventory'}—a repository for all the little gadgets that made their lives easier. With a sly smile, he continued, eager to guide players through this peculiar and enthralling text venture experience.",
                  ],
                },
                "isa-ruff": {
                  short:
                    "The 'Inventory' is like a stash of all the stuff you've picked",
                  paragraphs: [
                    "Right, listen up, love. Gotta tell ya 'bout this thing called the {style:bold:'Inventory'}. It's like a stash where we keep all our handy bits and bobs. Ya know, gadgets, tools, and whatnot. Comes in mighty useful in this peculiar text venture we're in. So, hold tight, and I'll show ya the ropes.",
                  ],
                },
              },
              npc:
                "The {person:young-lady:Young Lady}, while initially appearing disinterested, suddenly perks up upon hearing about the {style:bold:'Inventory'}. Her eyes widen with curiosity as she realizes the significance of this game mechanic. Leaning forward in her seat, she exclaims, 'Oh, how intriguing! The {style:bold:'Inventory'}, you say? That's a most valuable resource in our adventure, isn't it? Having a designated space to store and manage all the items we acquire along our journey is absolutely essential for progressing through the game. And the fact that we can access it from the top left corner menu, well, that's just convenient, isn't it? I can't help but wonder what fascinating items we'll discover and how they'll aid us on our quest. It's like unlocking a whole new level of possibilities!",
              next: [
                "help-ask-objects",
                "help-ask-actions",
                "help-ask-logbook",
                "help-end",
              ],
              dropIfAsked: true,
            },
            "help-explain-logbook": {
              pc: {
                "hardy-grow": {
                  short:
                    "Ah, the 'Logbook', a valuable tool for keeping track of your progress...",
                  paragraphs: [
                    "{player:hardy-grow:Hardy} proceeded to describe an essential feature of the text venture known as the {style:bold:'Logbook'}. Positioned conveniently at the bottom left corner of the screen, it served as a record of all user inputs and interactions throughout the adventure. The {style:bold:'Logbook'}, {player:hardy-grow:Hardy} explained, 'is a valuable tool for tracking your progress and revisiting important information.'",
                    "With a reassuring tone, he emphasized that privacy and data security were of utmost importance. 'Now, fear not, my dear adventurers,' {player:hardy-grow:Hardy} assured them, 'for there is no need to worry about data mining or intrusive data farming practices. Rest assured, all the data collected is stored solely in the browser's local storage, ensuring your privacy remains intact.'",
                    "Furthermore, {player:hardy-grow:Hardy} enlightened the players about their control over their own data. 'Should you ever wish to clear this log of your escapades, you can do so effortlessly. Simply head to the settings menu or the cookie settings of your browser, and with a few clicks, your data shall be wiped clean.'",
                    "He concluded with a final reassurance, 'Here at Ruff Grow - Private Investigation, we prioritize trust, fairness, and respect for your privacy. So venture forth with confidence, knowing that your data is in safe and trustworthy hands.'",
                  ],
                },
                "isa-ruff": {
                  short: "The 'Logbook' is like a journal of your escapades...",
                  paragraphs: [
                    "{player:isa-ruff:Isa}, adopting a more casual tone, took a moment to explain another crucial aspect of the text venture – the {style:bold:'Logbook'}. With a slight tilt of the head and a friendly smile, he shared, 'Alright, here's the deal. We've got this nifty thing called the {style:bold:'Logbook'}. You'll find it chillin' at the bottom left corner of the screen. It's like a handy record of everything you do and say in this adventure. You know, all your epic moves and important interactions? Yeah, the {style:bold:'Logbook'} keeps track of 'em all. It's a real gem for stayin' on top of your progress and checkin' back on stuff when needed. Gotta admit, it's quite the handy tool!'",
                    "'Listen up, me darlin' adventurers,' she began, her voice carrying a hint of warmth. 'No need to fret about dodgy data mining or intrusive snooping 'ere. Your privacy matters to us, and we make sure all the data we collect stays put in your browser's local storage. No funny business goin' on, I promise.'",
                    "She continued, sharing more details about the players' control over their own data. 'And if ya ever fancy clearin' out this log of your escapades, it's a piece of cake. Just 'ead to the settings or cookie settings in your browser, give a couple o' clicks, and boom! Your data's wiped clean as a whistle.'",
                    "Isa then wrapped up her explanation with a final assurance. 'Remember, at Ruff Grow - Private Investigation, we've got your back. Trust, fairness, and respect for your privacy are our top priorities. So go on, my lovelies, venture forth with confidence, knowin' your data is safe and sound in our trustworthy hands.'",
                  ],
                },
              },
              npc:
                "'How absolutely splendid!' exclaimed the {person:young-lady:Young Lady}, her eyes bright with enthusiasm. 'The {style:bold:'Logbook'}, a digital chronicle of our grand expedition! It captures every single action and detail, preserving them for future reference. Positioned in the bottom left corner of the menu, it's a stroke of genius for easy access and a seamless user experience. I must say, the ability to revisit past interactions and refresh my memory at will is truly remarkable. It's a testament to the meticulousness of this text venture, offering us a comprehensive account of our journey. Quite marvelous, indeed!'",
              next: [
                "help-ask-objects",
                "help-ask-actions",
                "help-ask-inventory",
                "help-end",
              ],
              dropIfAsked: true,
            },
            "case-start": {
              pc: {
                "hardy-grow": {
                  short:
                    "Pray tell, madam, what prompted your visit to our esteemed P.I. office?",
                  paragraphs: [
                    "With an air of curiosity and professionalism, {player:hardy-grow:Hardy} leaned forward slightly and addressed the {person:young-lady:Young Lady}, his voice filled with intrigue. 'Pray tell, madam,' he inquired, 'what fortuitous circumstances led you to grace our esteemed P.I. office with your presence today? We are most eager to assist and unravel the mysteries that brought you to our doorstep.'",
                  ],
                },
                "isa-ruff": {
                  short:
                    "Oi, love, what's the reason you popped into our P.I. office?",
                  paragraphs: [
                    "{player:isa-ruff:Isa} leaned in with a mischievous grin and a twinkle in her eye as she addressed the {person:young-lady:Young Lady}. 'Oi, love,' she exclaimed, 'what's the reason behind your visit to our P.I. office, eh? Got a little somethin' on your mind that needs our expertise? We're 'ere to help, so spill the beans and let's get crackin' on solvin' the mystery together!'",
                  ],
                },
              },
              npc:
                "The young woman's expression turned serious as she composed herself and spoke with a touch of anger in her voice. 'I'm sorry to say this, but I have reason to believe that my husband's faithfulness is in question. It pains me to even utter those words, but I cannot ignore the signs any longer. I've noticed peculiar behaviors and elusive explanations that have cast doubt upon his commitment to our marriage. It's a difficult situation, and I find myself torn between seeking the truth and hoping that my suspicions are unfounded.'",
              next: [
                "case-not-one-of-those-cases",
                "case-how-do-you-know-about-that",
                "case-does-he-know-that-you-know",
                "case-should-isa-kick-his-ass",
                "case-should-we-take-photos",
                "case-end",
              ],
            },
            "case-end": {
              pc: {
                "hardy-grow": {
                  short:
                    "I'm afraid we cannot take on any cases until the door is fixed.",
                  paragraphs: [
                    "{player:hardy-grow:Hardy}'s voice took on a tone of frustration and concern as he addressed the {person:young-lady:Young Lady}. 'I regret to inform you that we are currently unable to take on any new cases due to the persisting issue with the {scene:nimbus:door to the outside world}. It appears that our landlord, despite our repeated attempts to reach him, has neglected to address the problem. We understand the urgency of your situation, and it pains us to be unable to assist you at this time. Rest assured, we are doing everything within our power to resolve this matter swiftly and resume our investigative services.'",
                  ],
                },
                "isa-ruff": {
                  short:
                    "Sorry, luv, but we can't dive into any cases until the bleeding door's sorted.",
                  paragraphs: [
                    "{player:isa-ruff:Isa}, in her gruff tone and rough language, addressed the {person:young-lady:Young Lady} with a hint of frustration. 'Sorry, luv, but we can't bloody well take on any cases until that sodding door is properly sorted out. And if that door would actually work, I'd march straight out there to that slumlord piece of shit and give him a right good beatin' with me Pink Batty. He's a lazy bugger who ain't fixin' a damn thing around here.'",
                  ],
                },
              },
              npc:
                "'Well, that's a shame. I was really counting on some assistance with my situation. And this door... it's really eerie. I can't help but wonder how it ended up here. It's quite baffling, isn't it?'",
              next: ["help-start", "case-start"],
              dropIfAsked: true,
            },
            "case-not-one-of-those-cases": {
              pc: {
                "hardy-grow": {
                  short: "Oh, dear, not another one of those cases",
                  paragraphs: [
                    "{player:hardy-grow:Hardy}'s demeanor shifted slightly, a hint of nervousness creeping into his voice as he prepared to explain to the {person:young-lady:Young Lady}. 'Oh, dear,' he began, his words tinged with a touch of resignation. 'It seems we've encountered yet another one of those cases that can cause quite a stir. You see, in our line of work, it's often a tricky situation. If, by chance, we investigate and find that your suspicions are unfounded, you may believe you know better and choose not to compensate us. On the other hand, if we do uncover any unsettling truths, you might understandably be upset and refuse to pay because we would be the bearers of bad news. It's a delicate balance we walk, I'm afraid.' {player:hardy-grow:Hardy}'s gaze met the {person:young-lady:Young Lady}'s, a mix of apprehension and determination in his eyes as he prepared himself for her response.",
                  ],
                },

                "isa-ruff": {
                  short: "Blimey, love, not another case like this.",
                  paragraphs: [
                    "{player:isa-ruff:Isa}'s frustration grew evident as she prepared to address the {person:young-lady:Young Lady}. 'Bloody 'ell,' she exclaimed, her voice tinged with a mix of annoyance and anger. 'Not another bleedin' case like this, love. It's a right pain in the arse, it is. 'Ere's the thing, see. If we take this on and find out that you're wrong, reckonin' you know better, you won't cough up a penny, will ya? But, on the flip side, if we do uncover somethin' that gets you all riled up, you'll be so angry that you won't pay us, 'cause we're the sods bringin' you the bloody bad news. It's a right catch-22, innit?' {player:isa-ruff:Isa}'s eyes glared at the {person:young-lady:Young Lady}, her frustration simmering just beneath the surface as she awaited the woman's response.",
                  ],
                },
              },
              npc:
                "The {person:young-lady:Young Lady}'s expression turned to one of shock and offense as she retorted, her voice filled with disbelief and indignation. 'Goodness gracious! How on earth can you utter such outrageous statements? I assure you, I am not remotely the type of person you're insinuating. Your words are not only hurtful but also entirely unfounded.",
              next: [
                "case-how-do-you-know-about-that",
                "case-does-he-know-that-you-know",
                "case-should-isa-kick-his-ass",
                "case-should-we-take-photos",
                "case-end",
              ],
              dropIfAsked: true,
            },
            "case-how-do-you-know-about-that": {
              pc: {
                "hardy-grow": {
                  short: "How do you know about this?",
                  paragraphs: [
                    "{player:hardy-grow:Hardy}, sensing the escalating tension, attempted to diffuse the situation and approach it with reason. With a calming tone, he addressed the {person:young-lady:Young Lady}, hoping to gather more information. 'Pray tell, madam, how did you come to suspect such infidelity? Have you witnessed any concrete evidence of your husband's alleged indiscretions? It is important to consider that there might be a reasonable explanation behind his behavior. Allow me to share a cautionary tale from our past experiences. We once had a case where a husband was seemingly involved with another woman, but it turned out he was actually planning a surprise birthday party for his wife with her best friend. The outcome, I must admit, was far from pleasant, and we found ourselves uncompensated for our efforts. Moral of the story: appearances can be deceiving, and rash judgments may lead to undesirable consequences. Let us approach your situation with caution and thorough investigation.'",
                  ],
                },

                "isa-ruff": {
                  short: "Oi, love, how d'you know about that?",
                  paragraphs: [
                    "{player:isa-ruff:Isa}, recognizing the need to ease the tension and approach the situation with empathy, spoke up in her own direct manner. 'Oi, love, 'ow do ya know all that? Did ya catch 'im in the act, eh? There might be a proper explanation for all this, ya know. Let me share a little funny story with ya. We 'ad this case once, where this bloke was plannin' a surprise birthday bash for 'is missus, and 'e roped in 'er best mate to 'elp. Well, let me tell ya, that party was a right mess. No one 'ad a good time, and to top it off, we never got paid for our troubles. The point is, things ain't always what they seem, and rushin' to conclusions can lead to unwanted messes. Let's approach this with a bit o' caution, shall we? We'll get to the bottom of it together.'",
                  ],
                },
              },
              npc:
                "The {person:young-lady:Young Lady} took a deep breath, gradually calming down as she responded, 'That's quite a funny story indeed. I appreciate your perspective and the reminder that things may not always be as they appear. I must admit, I don't have hard evidence; it's more of a feeling I have about my husband's behavior. Perhaps I'm being overly suspicious, but I can't shake this nagging doubt. I just want to know the truth, whatever it may be.'",
              next: [
                "case-not-one-of-those-cases",
                "case-does-he-know-that-you-know",
                "case-should-isa-kick-his-ass",
                "case-should-we-take-photos",
                "case-end",
              ],
              dropIfAsked: true,
            },
            "case-does-he-know-that-you-know": {
              pc: {
                "hardy-grow": {
                  short:
                    "Does he have any idea that you're aware of his actions?",
                  paragraphs: [
                    "{player:hardy-grow:Hardy} leaned forward, his voice filled with concern, as he asked, 'Does your husband have any inkling that you're aware of his actions? Has he given any indication that he suspects your doubts or is trying to hide something from you?'",
                  ],
                },

                "isa-ruff": {
                  short: "Does 'e 'ave a clue that you're onto 'im?",
                  paragraphs: [
                    "{player:isa-ruff:Isa}'s expression turned worried as she asked in a concerned tone, 'Does he 'ave any inkling that you're onto 'im? 'As 'e shown any signs that 'e suspects your doubts or that 'e's tryin' to keep somethin' from ya?'",
                  ],
                },
              },
              npc:
                "The {person:young-lady:Young Lady}'s voice took on a slightly naive and uncertain tone as she replied, 'To be quite honest, I'm not entirely sure. I haven't noticed any overt signs or indications that he's aware of my suspicions. It's all just a gut feeling at this point.'",
              next: [
                "case-not-one-of-those-cases",
                "case-how-do-you-know-about-that",
                "case-should-isa-kick-his-ass",
                "case-should-we-take-photos",
                "case-end",
              ],
              dropIfAsked: true,
            },
            "case-should-isa-kick-his-ass": {
              pc: {
                "hardy-grow": {
                  short: "Should we have Isa give him a proper thrashing?",
                  paragraphs: [
                    "{player:hardy-grow:Hardy}'s voice carried a hint of amusement as he posed the question, 'Pray, should we enlist {player:isa-ruff:Isa}'s services to administer a thorough thrashing? Rest assured, a sum of 5000 dollars in cash will suffice, and no inquiries shall be made regarding the matter. Allow me to elucidate on the details of this proposition.'",
                  ],
                },

                "isa-ruff": {
                  short: "Shall I give him a good kicking?",
                  paragraphs: [
                    "{player:isa-ruff:Isa}'s voice filled with childlike anticipation as she eagerly chimed in, 'Oi, reckon I should give 'im a proper kicking, yeah? Five grand in cold, hard cash, no bleedin' questions asked. Let me break it down for ya, love, the whole shebang.'",
                  ],
                },
              },
              npc:
                "The {person:young-lady:Young Lady} turned to {player:hardy-grow:Hardy}, her curiosity piqued but also a hint of doubt in her voice. 'I'm not quite certain. She appears rather slender. Do you reckon she can handle him?'",
              effects: [
                {
                  type: "add-paragraph-to-scene",
                  paragraphs: [
                    "As the {person:young-lady:Young Lady} expressed her doubts about {player:isa-ruff:Isa}'s ability to handle her husband, {player:hardy-grow:Hardy}'s attention was suddenly drawn to a peculiar sight. There, in the corner of the room, stood {player:isa-ruff:Isa} with an air of confidence, brandishing Pink Batty like a valiant warrior brandishes a sword.",
                    "{player:isa-ruff:Isa}'s posture spoke volumes, conveying a message contrary to the doubts cast upon her. With a mischievous twinkle in her eye, she wielded Pink Batty with finesse, demonstrating her strength and determination. The baseball bat seemed to emanate an aura of power, as if it were an extension of {player:isa-ruff:Isa} herself.",
                    "{player:hardy-grow:Hardy} couldn't help but be captivated by the scene before him. It was as if time stood still, and the room was filled with an electric energy. In that moment, he realized that underestimating {player:isa-ruff:Isa} would be a grave mistake.",
                  ],
                  dropEffect: true,
                },
              ],
              next: [
                "case-not-one-of-those-cases",
                "case-how-do-you-know-about-that",
                "case-does-he-know-that-you-know",
                "case-should-we-take-photos",
                "case-end",
              ],
              dropIfAsked: true,
            },
            "case-should-we-take-photos": {
              pc: {
                "hardy-grow": {
                  short: "Shall we gather photographic evidence",
                  paragraphs: [
                    "{player:hardy-grow:Hardy} proposed a more reasonable course of action, his voice taking on a composed and pragmatic tone, 'Pray tell, madam, what course of action shall we pursue? Might I suggest gathering concrete evidence, such as photographic proof, to bolster your position in the divorce proceedings? In that scenario, we would be entitled to a modest 5% of your eventual divorce settlement. Rest assured, it would involve the necessary official procedures and paperwork.'",
                  ],
                },
                "isa-ruff": {
                  short: "Shall we snap some pictures",
                  paragraphs: [
                    "{player:isa-ruff:Isa} chimed in with a mixture of anticipation and disappointment in her voice, laced with a touch of streetwise charm, 'Alright, love, what's the game plan then? Shall we go clickety-click and gather some evidence to give you the upper hand in the divorce proceedings? If we go down that route, we'll be takin' a 5% cut from your divorce share. Mind you, it's the more official way, so there'll be a bit of paperwork to deal with. Not as fun as a good ol' bash with the Pink Batty, but sometimes we gotta play it by the books.'",
                  ],
                },
              },
              npc:
                "The {person:young-lady:Young Lady} responded with relief in her voice, grateful for the suggestion. She replied, 'That would be excellent. I want to ensure I have the upper hand in this situation.' She paused for a moment, considering the 5% fee. 'However, my husband is a wealthy man, and 5% does seem quite substantial. Is there any room for negotiation in terms of the fee?'",
              next: [
                "case-not-one-of-those-cases",
                "case-how-do-you-know-about-that",
                "case-does-he-know-that-you-know",
                "case-should-isa-kick-his-ass",
                "case-end",
              ],
              dropIfAsked: true,
            },
          },
        },
        {
          type: "random-talk-to",
          id: "rnd-talk-to-young-lady",
          matchesPlayer: "hardy-grow",
          matchesAction: {
            oneOf: "talk-to",
          },
          matchesObjects: [
            {
              oneIdOf: "young-lady",
            },
          ],
          questions: [
            "I'm afraid we cannot take on any cases until the door is fixed. We cannot leave the door to the mad world outside. The landlord responsible for it is, well, let's just say lacking in motivation.",
          ],
          responses: [
            "'Well, that's a shame. I was really counting on some assistance with my situation. And this door... it's really eerie. I can't help but wonder how it ended up here. It's quite baffling, isn't it?'",
          ],
          effects: [
            {
              type: "add-paragraph-to-scene",
              paragraphs: [
                "{player:isa-ruff:Isa}, feeling slightly annoyed with {player:hardy-grow:Hardy}'s incessant chatter, let out a low growl of frustration. Her colorful hair seemed to bristle with impatience as she barked at him, her voice laced with a punk-rock edge, 'Oi, Hardy! Leave it be, will ya? Can't ya see I'm tryin' to catch some shut-eye here? For the love of all that's punk, just let me sleep, for god's sake!'",
                "In a hushed tone, {player:hardy-grow:Hardy} turned his attention to the reader, breaking the fourth wall with a conspiratorial air. 'Perhaps,' he whispered, 'it's best to let {player:isa-ruff:Isa} be for now. She does have a certain talent for irritable slumber, after all. But fear not, dear reader, for your adventure does not end here.'",
                "He leaned closer, his voice tinged with excitement. 'Why don't you take this opportunity to explore the world beyond these office walls? Go ahead, have a little wander. Peek into the mysterious corners and hidden nooks, for there's a realm of real adventure awaiting you. Who knows what wonders and puzzles lie just beyond that {link:home:milch glass door}?'",
              ],
              dropEffect: true,
            },
          ],
        },
        {
          type: "random-talk-to",
          id: "rnd-talk-to-young-lady",
          matchesPlayer: "isa-ruff",
          matchesAction: {
            oneOf: "talk-to",
          },
          matchesObjects: [
            {
              oneIdOf: "young-lady",
            },
          ],
          questions: [
            "Sorry, luv, but we can't dive into any cases until the bleeding door's sorted. Can't let the nutter world wander in, can we? Blame that lazy slumlord, the wanker.",
          ],
          responses: [
            "The Young Lady expressed her disappointment and shared her concern about the door. She remarked, 'Well, that's a shame. I was really counting on some assistance with my situation. And this {scene:nimbus:door...} it's really eerie. I can't help but wonder how it ended up here. It's quite baffling, isn't it?'",
          ],
        },
        {
          type: "walk-to",
          id: "walk-to-kitchen",
          matchesAction: {
            oneOf: "walk-to",
          },
          matchesObjects: [
            {
              oneIdOf: "kitchen",
            },
          ],
          responses: ["Someone need's to do the dishes"],
        },
        {
          type: "walk-to",
          id: "walk-to-world",
          matchesAction: {
            oneOf: "walk-to",
          },
          matchesObjects: [
            {
              oneIdOf: "world",
            },
          ],
          responses: ["Stepping out of the door might lead to peril and harm"],
        },
      ],
    },
    {
      type: "scene",
      id: "kitchen",
      name: "The Kitchen",
      description:
        "The kitchen, a chaotic battleground, featured a towering mound of dishes, cluttered countertops, and a mysterious refrigerator secured by chains.",
      paragraphs: [
        "As {player:hardy-grow:Hardy} and {player:isa-ruff:Isa} cautiously tiptoed into the kitchen, a spectacle of pandemonium unfolded right before their bewildered eyes. The sink, burdened with an improbable heap of {thing:dishes:dishes}, defied the very laws of gravity, threatening an imminent avalanche of culinary chaos.",
        "Countertops, once pristine and orderly, now hosted a jumble of pots, pans, and utensils in a delightful display of anarchic artwork. It was as if a mischievous poltergeist had orchestrated a whimsical obstacle course, daring any daring cook to attempt a culinary feat amidst the tumultuous tangle.",
        "However, it was the {thing:refrigerator:refrigerator} that stole the show, a tantalizing enigma buzzing in the corner. Secured by a formidable {thing:chain:chain} and {thing:lock:lock}, it guarded its mysterious contents like a sentinel protecting an arcane treasure. {player:hardy-grow:Hardy} and {player:isa-ruff:Isa} found themselves captivated by its seductive hum, their minds wandering into the realm of gastronomic possibilities.",
        "From the vantage point of the scene, the {scene:office:office} unfurled—a concoction of character and clutter. A desk adorned with important documents, a sofa that whispered tales of relaxation, and an air of enigmatic possibilities permeating the atmosphere.",
      ],
      persons: [],
      things: [
        {
          type: "thing",
          id: "dishes",
          name: "dishes",
          description: "heap of dishes, defied the very laws of gravity",
          interactions: [],
        },
        {
          type: "thing",
          id: "refrigerator",
          name: "refrigerator",
          description:
            "The refrigerator, a humming enigma, stood in the corner, its contents concealed behind a chain and lock, tempting curiosity.",
          interactions: [],
        },
        {
          type: "thing",
          id: "chain",
          name: "chain",
          description:
            "The chain, a sturdy barrier, secured the refrigerator with unyielding determination.",
          interactions: [],
        },
        {
          type: "thing",
          id: "lock",
          name: "lock",
          description:
            "The lock, an impenetrable guardian, safeguarded the refrigerator's secrets with unwavering resolve.",
          interactions: [],
        },
      ],
      interactions: [
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
    },
  ],
};

/*

        

        
        

        ---
        "A gentle reminder from the author. In the unlikely event that you stumble upon an object from the nimbus, please bear with us. It appears that I might not have defined the object correctly in this particular instance. I apologize for any confusion caused, and I kindly request you to file a bug report on {link:github:GitHub}. Your feedback is invaluable in improving the text venture experience. Now, let's continue with our adventure through the quirky world of Hardy, Isa, and the enigmatic {person:young-lady:Young Lady}.",

*/
