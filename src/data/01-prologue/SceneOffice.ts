import { TextScene } from "../../model/TextScene";

export const SceneOffice: TextScene = {
  type: "scene",
  id: "office",
  name: "Ruff Grow - Private Investigations",
  description:
    "The office, a den of intrigue, housed a cluttered desk, a worn sofa, and an air of enigmatic possibilities.",
  paragraphs: [
    "Behind the milch glass front door, adorned with golden letters spelling out the name of the office, 'Ruff Grow - Private Investigations', beckoned a realm of captivating intrigue. ",
    "Step inside, and you'd find yourself in the heart of their eccentric furniture. The {thing:desk:desk}, weathered and wooden, stood as a testament to time's enduring presence. Its surface bore the weight of countless important documents, scattered among ink stains and the occasional coffee ring. And there, in a corner, resided the {thing:sofa-with-chain-and-lock:Chesterfield sofa}, a relic of ancient times. Its worn leather exuded a subtle aroma, a breath that whispered stories of long-forgotten tales and investigations past.",
    "In the cluttered office of Ruff Grow Investigations, {player:hardy-grow:Hardy Grow} scowled at a stack of bills on his {thing:desk:Desk}. Meanwhile, {player:isa-ruff:Isa Ruff} reclined lazily on the {thing:sofa-with-chain-and-lock:Chesterfield sofa}, her disheveled appearance perfectly complementing her punk-rock spirit.",
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
      id: "sofa-with-chain-and-lock",
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
        {
          id: "isa-uses-sofa",
          type: "random",
          matchesPlayer: "isa-ruff",
          matchesAction: {
            oneOf: "use",
          },
          matchesObjects: [
            {
              oneIdOf: ["sofa", "sofa-with-chain-and-lock"],
            },
          ],
          responses: [
            "'Right, time for a bit of a rest on the old sofa.'",
            "'Oi, this sofa's lookin' mighty comfy, innit?'",
            "'Ah, finally, a chance to plop meself down on this 'ere sofa.'",
            "'Lovely jubbly, a chance to sink into this proper cozy sofa.'",
            "'Oi, this sofa's got a right nice feel to it, like sittin' on a cloud.'",
            "'Blimey, this sofa's like me own personal oasis of comfort.'",
            "'I tell ya, this sofa's a blessin' for me tired bones.'",
            "'Just gonna 'ave a quick sit-down on this comfy sofa, won't be long.'",
            "'Ah, the sweet relief of settlin' meself on this plush sofa.'",
            "'This sofa's callin' me name, beggin' for a bit of relaxation.'",
            "'Me feet are achin', time to give 'em a break on this trusty sofa.'",
            "'This sofa's like a sanctuary in the midst of the chaos, I tell ya.'",
            "'Nothin' like a moment of solace on this 'ere sofa, absolute bliss.'",
            "'Sittin' on this sofa feels like a warm 'ug from an old friend.'",
            "'Oi, if this sofa could talk, I wonder what stories it'd share.'",
            "'Let me just sink into this sofa and forget about the world for a while.'",
            "'Ahh, this sofa's me refuge from the madness, me safe haven.'",
            "'Gotta admit, this sofa's got a charm all of its own, like an old mate.'",
            "'Sofa, oh sweet sofa, you're me haven in this chaotic world.'",
            "'Just gonna take a load off and unwind on this trusty sofa, nothin' better.'",
          ],
        },
        {
          id: "isa-uses-sofa",
          type: "random",
          matchesPlayer: "hardy-grow",
          matchesAction: {
            oneOf: "use",
          },
          matchesObjects: [
            {
              oneIdOf: ["sofa", "sofa-with-chain-and-lock"],
            },
          ],
          responses: [
            "'Ah, a moment of respite awaits on this exquisite sofa.'",
            "'Allow me to indulge in the comfort of this splendid sofa.'",
            "'This sofa beckons me with its refined elegance and undeniable allure.'",
            "'A chance to recline upon this luxurious sofa is a true delight.'",
            "'The allure of this sofa's opulent cushions is simply irresistible.'",
            "'A well-deserved rest upon this magnificent sofa is in order.'",
            "'The craftsmanship of this sofa is truly remarkable, a testament to fine design.'",
            "'This sofa offers a sanctuary of relaxation amidst the chaos of the world.'",
            "'Let me find solace in the embrace of this graceful and inviting sofa.'",
            "'The cushioning of this sofa promises unparalleled comfort and support.'",
            "'I shall momentarily retreat to this plush sofa, a haven of tranquility.'",
            "'The elegance and refinement of this sofa make it a true masterpiece.'",
            "'This sofa exudes an air of sophistication and invites me to unwind.'",
            "'Permit me to bask in the serenity provided by this opulent sofa.'",
            "'This sofa's regal presence demands that I take a moment to rest.'",
            "'The sheer magnificence of this sofa commands my attention and repose.'",
            "'I am enticed by the prospect of sinking into the plushness of this exquisite sofa.'",
            "'This sofa's allure lies in its perfect blend of comfort and style.'",
            "'Allow me a brief respite on this distinguished sofa, for it promises rejuvenation.'",
            "'The prospect of reclining upon this sublime sofa fills me with utmost satisfaction.'",
          ],
        },
        {
          id: "isa-uses-flash-light-on-with-sofa",
          type: "effects",
          matchesPlayer: "isa-ruff",
          matchesAction: {
            oneOf: "use",
          },
          matchesObjects: [
            { oneIdOf: "flashlight-on" },
            { oneIdOf: "sofa-with-chain-and-lock" },
          ],
          effects: [
            {
              type: "add-paragraph-to-scene",
              paragraphs: [
                "With a mischievous grin, {player:isa-ruff:Isa} lowered herself down and wriggled under the {thing:sofa:sofa}, her flashlight casting a dim glow on the hidden space. As her hand reached out, her fingertips brushed against something cold and metallic. Her eyes widened with recognition as she retrieved a chain with a lock, a familiar sight from a long-forgotten case. Memories flooded her mind, reminding her of the key role this chain played in that case with the tiger. How could she have forgotten such an important tool? Determined not to repeat the same mistake, she carefully stashed the chain away, eager to utilize its potential in the current investigation.",
              ],
            },
            {
              type: "change-thing-in-scene",
              oldId: "sofa-with-chain-and-lock",
              newId: "sofa",
            },
            {
              type: "add-thing-to-inventory",
              thing: {
                type: "thing",
                id: "chain-with-lock",
                description: "Chain with Lock",
                interactions: [],
                name: "Chain with Lock",
              },
            },
          ],
        },
        {
          id: "hardy-uses-flash-light-on-with-sofa",
          type: "effects",
          matchesPlayer: "hardy-grow",
          matchesAction: {
            oneOf: "use",
          },
          matchesObjects: [
            { oneIdOf: "flashlight-on" },
            { oneIdOf: "sofa-with-chain-and-lock" },
          ],
          effects: [
            {
              type: "add-paragraph-to-scene",
              paragraphs: [
                "With a determined look on his face, {player:hardy-grow:Hardy} wriggles his way under the {thing:sofa:sofa}, flashlight in hand, in search of hidden treasures. After a bit of struggling due to his corpulent frame, he manages to retrieve a chain with a lock. A nostalgic smile forms on his lips as memories flood back from an old case where this very chain proved instrumental in restraining a mischievous tiger.",
                "'Ah, the memories,' Hardy chuckles to himself. 'That tiger never stood a chance against this trusty chain. Good times, indeed.'",
              ],
            },
            {
              type: "change-thing-in-scene",
              oldId: "sofa-with-chain-and-lock",
              newId: "sofa",
            },
            {
              type: "add-thing-to-inventory",
              thing: {
                type: "thing",
                id: "chain-with-lock",
                description: "Chain with Lock",
                interactions: [
                  {
                    id: "use-key-with-lock",
                    type: "random",
                    matchesAction: {
                      oneOf: "use",
                    },
                    matchesObjects: [
                      {
                        oneIdOf: ["chain-with-lock", "little-key"],
                      },
                      {
                        oneIdOf: ["chain-with-lock", "little-key"],
                      },
                    ],
                    responses: ["That is a match"],
                    effects: [
                      {
                        type: "change-thing-in-inventory",
                        keepEffect: true,
                        oldId: "chain-with-lock",
                        newId: "chain-with-open-lock",
                        name: "Chain with open Lock",
                        description: "Chain with open Lock",
                      },
                    ],
                  },
                  {
                    id: "use-key-with-open-lock",
                    type: "random",
                    matchesAction: {
                      oneOf: "use",
                    },
                    matchesObjects: [
                      {
                        oneIdOf: ["chain-with-open-lock", "little-key"],
                      },
                      {
                        oneIdOf: ["chain-with-open-lock", "little-key"],
                      },
                    ],
                    responses: ["That is a match"],
                    effects: [
                      {
                        type: "change-thing-in-inventory",
                        keepEffect: true,
                        newId: "chain-with-lock",
                        oldId: "chain-with-open-lock",
                        name: "Chain with Lock",
                        description: "Chain with Lock",
                      },
                    ],
                  },
                ],
                name: "Chain with Lock",
              },
            },
          ],
        },
      ],
    },
    {
      type: "thing",
      id: "little-key",
      description:
        "The key, small and metallic, holds the potential to unlock secrets and open doors to hidden realms of possibility.",
      name: "Little Key",
      interactions: [
        {
          type: "random",
          id: "pick-up-key",
          matchesAction: {
            oneOf: "pick-up",
          },
          matchesObjects: [
            {
              oneIdOf: "little-key",
            },
          ],
          responses: [
            "You pick up the key, feeling its weight in your hand. Its significance becomes apparent as you wonder what it may unlock.",
          ],
          effects: [
            {
              type: "pick-up-thing-from-scene",

              thingId: "little-key",
            },
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
      startDialogIds: ["help-start", "case-start"],
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
              short: "That's all I can blabber about investigations, innit?",
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
              short: "Might I offer a more discourse on the objects at hand?",
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
                "{player:hardy-grow:Hardy} paused for a moment, allowing the significance of his words to sink in. Then, he continued, 'We have {style:bold:'Scenes'} too, like this {scene:kitchen:kitchen} we're in right now.' He glanced around to emphasize his point. 'And finally, we have those enigmatic forgotten objects, like the {scene:nimbus:crazy wild world*} beyond that milch glass door,' he gestured towards the entrance. 'Trust me, it's best left unexplored.'",
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
          effects: [
            {
              type: "add-footnote",
              footnotes: [
                "*) A gentle reminder from the author. In the unlikely event that you stumble upon an object from the nimbus, please bear with me. It appears that I might not have defined the object correctly in this particular instance. I apologize for any confusion caused, and I kindly request you to file a bug report on {link:github:GitHub}. Your feedback is invaluable in improving the text venture experience. Now, let's continue with our adventure through the quirky world of {player:hardy-grow:Hardy}, {player:isa-ruff:Isa}, and the enigmatic {person:young-lady:Young Lady}.",
              ],
            },
          ],
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
                "{style:bold:'Pick up'} facilitated adding items to the inventory (which would be covered later), like the {thing:little-key:little key} lying on the {thing:desk:desk}",
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
                "Then we got {style:bold:'Pick up'}. This one's straightforward, mate. Ya use it to nab things and stash 'em in your inventory. Like that {thing:little-key:little key} sittin' on the {thing:desk:desk}, for example.",
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
              short: "Does he have any idea that you're aware of his actions?",
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
};
