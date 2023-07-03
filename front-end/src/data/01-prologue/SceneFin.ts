import { TextScene } from "../../model/TextScene";

export const SceneFin: TextScene = {
  type: "scene",
  id: "fin",
  name: "Fin",
  description: "This is the end",
  paragraphs: [
    "The scene unfolded in the familiar confines of the office, where remnants of the day's exploits mingled with the air of triumph. {player:isa-ruff:Isa}, driven by the exhilaration of her victory, darted straight to her prized {thing:records:record collection}. With deft hands, she rummaged through the stacks, seeking the perfect soundtrack to accompany their celebration.",
    "Meanwhile, {player:hardy-grow:Hardy}, unable to contain his excitement, prattled on about the audacious escapade, praising {player:isa-ruff:Isa}'s elegant maneuver that ensnared the landlord within the frigid confines of the refrigerator. In his enthusiasm, he stumbled about the room, his movements resembling a bumbling ballerina attempting to imitate {player:isa-ruff:Isa}'s graceful 'Twirling Willow' rotation. He veered perilously close to the {thing:record-player:record player}, nearly shattering it beneath the weight of his enthusiastic clumsiness.",
  ],
  things: [
    {
      type: "thing",
      id: "records",
      description:
        "The record collection boasted the rebellious spirit of the early '80s English punk rock scene, featuring the raw and powerful sounds of iconic bands like The Clash, Sex Pistols, The Damned, Buzzcocks, and Siouxsie and the Banshees. Each vinyl disc held a sonic rebellion waiting to be unleashed.",
      name: "punk rock record collection",
      interactions: [],
    },
    {
      type: "thing",
      id: "record-player",
      description:
        "The record player, a cherished relic, stood as a gateway to auditory bliss, its sleek design beckoning to spin tales of melodic enchantment.",
      name: "punk rock record collection",
      interactions: [],
    },
    {
      type: "thing",
      id: "sofa",
      description:
        "The inviting sofa, with its plush cushions and gentle embrace, beckoned them irresistibly, luring them into a blissful nap.",
      name: "Chesterfield Sofa",
      interactions: [],
    },
  ],
  persons: [],
  interactions: [
    {
      type: "effects",
      id: "use-records-with-player",
      matchesAction: { oneOf: "use" },
      matchesObjects: [
        { oneIdOf: ["records", "record-player"] },
        { oneIdOf: ["records", "record-player"] },
      ],
      effects: [
        {
          type: "add-paragraph-to-scene",
          paragraphs: [
            "{player:isa-ruff:Isa} skillfully placed the vinyl record of The Clash's 'London Calling' onto the turntable, carefully dropping the needle onto the spinning disc. The room filled with the electrifying opening chords, igniting their spirits. With a mischievous gleam in her eyes, Isa grabbed Hardy's hand, and together they leaped onto the {thing:sofa:Chesterfield Sofa}. Their bodies bounced and swayed, fueled by the rebellious rhythm. They defied gravity, jumping higher, losing themselves in the wild abandon of punk rock. The {thing:sofa:Chesterfield Sofa} became their makeshift stage, a platform for their exuberant performance, as they danced and embraced the liberating power of 'London Calling.'",
          ],
        },
        {
          type: "play-sound",
          url: "/sounds/3bec76d1-b10d-4f02-bbb7-e5fc4aafe44a.mp3",
          keepEffect: true,
        },
      ],
    },
    {
      type: "effects",
      id: "use-sofa",
      matchesAction: { oneOf: "use" },
      matchesObjects: [{ oneIdOf: ["sofa"] }],
      effects: [
        {
          type: "add-paragraph-to-scene",
          paragraphs: [
            "{player:isa-ruff:Isa}, feeling slightly annoyed with {player:hardy-grow:Hardy}'s incessant chatter, let out a low growl of frustration. Her colorful hair seemed to bristle with impatience as she barked at him, her voice laced with a punk-rock edge, 'Oi, Hardy! Leave it be, will ya? Can't ya see I'm tryin' to catch some shut-eye here? For the love of all that's punk, just let me sleep, for god's sake!'",
            "In a hushed tone, {player:hardy-grow:Hardy} turned his attention to the reader, breaking the fourth wall with a conspiratorial air. 'Perhaps,' he whispered, 'it's best to let {player:isa-ruff:Isa} be for now. She does have a certain talent for irritable slumber, after all. But fear not, dear reader, for your adventure does not end here.'",
            "He leaned closer, his voice tinged with excitement. 'Why don't you take this opportunity to explore the world beyond these office walls? Go ahead, have a little wander. Peek into the mysterious corners and hidden nooks, for there's a realm of real adventure awaiting you. Who knows what wonders and puzzles lie just beyond that {link:home:milch glass door}?'",
          ],
        },
      ],
    },
  ],
};
