import { Story } from '../types';
import { BOOK_COVERS } from '../assets/images';

export const SAMPLE_STORIES: Story[] = [
  {
    id: 'story-summer-stayed',
    title: 'The Summer We Almost Stayed',
    author: 'Clara Vance',
    narrator: {
      id: 'narrator-clara',
      name: 'Eleanor Sterling',
      accent: 'British',
      tone: 'Intimate, warm, evocative',
      gender: 'female',
    },
    coverImage: BOOK_COVERS.summerStayed,
    synopsis:
      'Seven summers after walking away from the sun-drenched cliffs of Positano, architect Julian returns to restore an estate—only to discover the woman who kept his letters still lives next door. An aching, slow-burning romance of second chances, coastal salt, and promises never forgotten.',
    genre: 'Slow Burn',
    tropes: ['Slow Burn', 'Second Chance', 'Small Town Romance'],
    status: 'Ongoing',
    totalPlannedChapters: 100,
    publishedChaptersCount: 25,
    totalDurationSeconds: 6840,
    isFeatured: true,
    releasedAt: '2026-06-12',
    updatedAt: '2026-10-25',
    chapters: [
      {
        id: 'chap-ss-5',
        storyId: 'story-summer-stayed',
        number: 5,
        title: 'The Harbor Lanterns at Midnight',
        durationSeconds: 240,
        publishedAt: 'Today (Oct 25)',
        isPremium: true,
        wordCount: 520,
        synopsis: 'NEW TODAY: Julian and Elena share a quiet confession beneath the amber lanterns of the harbor dock.',
        proseExcerpt:
          'Midnight arrived in Positano with a soft offshore breeze that smelled of wild rosemary and cool salt spray. Julian leaned against the weathered cypress railing of the pier, watching the reflection of the golden harbor lanterns stretch across the black water. When footsteps clicked softly on the travertine flagstones behind him, he didn’t need to turn to know she had come.\n\n"You should be asleep," Elena murmured, pulling her cream wool shawl closer around her shoulders. Her dark hair was undone, spilling in loose waves over the lapel of her coat.\n\n"I tried," Julian admitted, turning toward her. The lamplight caught the amber flecks in her eyes, eyes that had haunted his sketchbooks across three continents. "Every time I closed my eyes, I kept hearing the bells of Santa Maria Assunta, and the sound of your voice asking why I waited so long to come back."\n\nElena took a step closer, close enough that he could catch the familiar scent of orange blossom that had always belonged to her. "And what answer did you find in the dark, Julian?"\n\n"That I was terrified," he said, his voice dropping to a raw whisper that barely carried above the lap of the tide. "Terrified that if I returned, you would look at me like a stranger. But seeing you tonight... I realize that leaving was the only mistake I ever truly made."'
      },
      {
        id: 'chap-ss-1',
        storyId: 'story-summer-stayed',
        number: 1,
        title: 'The Sound of the Tide at Dusk',
        durationSeconds: 210,
        publishedAt: 'Oct 18',
        isPremium: false,
        wordCount: 460,
        synopsis: 'Julian arrives by ferry at the Amalfi harbor as the sun dips below the terrace.',
        proseExcerpt:
          'The ferry engine sputtered into silence just as the bells of Santa Maria Assunta struck seven. Salt air hit Julian before the harbor did—sharp, briny, and steeped in lemons warming on stone terraces. He adjusted the leather strap of his drafting satchel, his fingers brushing the creased corner of an envelope he had carried across four borders.\n\nSeven years had softened the memory of this coastline, but stepping onto the worn travertine steps made the distance vanish in a single breath. The evening sky was a bruised plum and apricot, melting into the sapphire Mediterranean.\n\nAnd then he looked up toward the terracotta roofline of Villa Serenita, high on the limestone bluffs, and saw the linen curtains shifting in the evening wind. Elena was still there. He had spent seven years running from this cliffside, only to realize his heart had never boarded the outbound train.'
      },
      {
        id: 'chap-ss-2',
        storyId: 'story-summer-stayed',
        number: 2,
        title: 'Travertine and Sea Glass',
        durationSeconds: 225,
        publishedAt: 'Oct 19',
        isPremium: false,
        wordCount: 480,
        synopsis: 'An unexpected encounter at the olive grove uncovers years of unasked questions.',
        proseExcerpt:
          'Elena had never been good at leaving things half-done. Her hands were smudged with dry earth and wild thyme when the iron gate creaked open. It was a rhythm she knew by heart—two heavy scrapes, then a rhythmic thud against the bougainvillea trellis.\n\nWhen she looked up, she did not drop the ceramic bowl in her hands; she simply stopped breathing. Julian stood beneath the olive canopy, the slant of Mediterranean dusk catching the slight silver at his temples.\n\n"You didn\'t tell anyone you were coming," she said, her voice softer than she intended, trembling on the edge of memory.\n\nJulian took off his coat, laying it over the dry stone wall. "If I had written first, Elena, you would have found a reason to be in Florence."'
      },
      {
        id: 'chap-ss-3',
        storyId: 'story-summer-stayed',
        number: 3,
        title: 'Unanswered Correspondence',
        durationSeconds: 235,
        publishedAt: 'Oct 21',
        isPremium: true,
        wordCount: 495,
        synopsis: 'A rainstorm traps them together inside the stone carriage house.',
        proseExcerpt:
          'The squall arrived without preamble from the Gulf of Salerno. Within minutes, torrential rain beat against the arched glass doors of the old carriage house. The damp air carried the scent of wet pine and aged cedar drawers.\n\nJulian set down his brass lamp on the potting bench, watching the candlelight play across Elena’s jawline. She was wringing rainwater from the hem of her linen skirt, her chest rising and falling with shallow breaths.\n\n"I wrote thirty-two letters," he said quietly, the sound barely rising above the thunder. "Every month from London, every winter from Vienna."\n\nElena paused, her hands stilling against the wet cloth. She met his gaze with fierce, wounded clarity. "I didn\'t throw away a single one. That’s what hurt the most."'
      },
      {
        id: 'chap-ss-4',
        storyId: 'story-summer-stayed',
        number: 4,
        title: 'The Blue Hour Promise',
        durationSeconds: 215,
        publishedAt: 'Oct 23',
        isPremium: true,
        wordCount: 470,
        synopsis: 'Walking along the cliff path at midnight, words they held back come to the surface.',
        proseExcerpt:
          'The midnight path above the cove was narrow and slick with sea spray. Julian extended a hand, and when Elena took it, neither let go. The Mediterranean was a sheet of obsidian beneath them, reflecting nothing but the quiet constellations of a summer that refused to remain in the past.\n\n"We were too young then," she said softly, leaning into the warmth of his shoulder against the cliff wind.\n\n"We were frightened," Julian corrected, his fingers interlacing with hers. "I thought building a career meant leaving my heart behind. Now I know the only home I ever cared about was right here."'
      }
    ]
  },
  {
    id: 'story-contract-winter',
    title: 'A Contract Written in Winter',
    author: 'Clara Vance',
    narrator: {
      id: 'narrator-julian',
      name: 'James Montgomery',
      accent: 'American',
      tone: 'Deep, measured, commanding yet tender',
      gender: 'male',
    },
    coverImage: BOOK_COVERS.contractWinter,
    synopsis:
      'To secure her family’s historic publishing imprint, independent editor Gemma agrees to a six-month sham engagement with venture financier Marcus Sterling. But high above a snowbound Manhattan, the boundary between calculated clauses and fierce devotion begins to blur.',
    genre: 'Billionaire',
    tropes: ['Billionaire Romance', 'Enemies to Lovers', 'Workplace Romance'],
    status: 'Ongoing',
    totalPlannedChapters: 100,
    publishedChaptersCount: 39,
    totalDurationSeconds: 7200,
    isFeatured: false,
    releasedAt: '2026-08-01',
    updatedAt: '2026-10-25',
    chapters: [
      {
        id: 'chap-cw-4',
        storyId: 'story-contract-winter',
        number: 4,
        title: 'Whispers in the Snow',
        durationSeconds: 245,
        publishedAt: 'Today (Oct 25)',
        isPremium: true,
        wordCount: 510,
        synopsis: 'NEW TODAY: Trapped in Marcus’s private study as the blizzard intensifies, the contract rules are tested.',
        proseExcerpt:
          'The blizzard howled outside the penthouse, painting the Manhattan skyline into a white abstraction. Inside Marcus’s walnut-paneled library, only the crackle of birch logs in the hearth broke the heavy silence.\n\nGemma sat curled in the leather armchair, reviewing the redlined clauses of their agreement. Marcus stood by the bar, slowly unknotting his charcoal silk tie. He poured two glasses of twenty-year bourbon and walked over, handing one to her.\n\n"You missed a detail in Subsection B," he remarked, his voice low and smoky.\n\nGemma looked up, her heart taking an unruly jump against her ribs. "I drafted Subsection B myself, Mr. Sterling. It clearly dictates no public displays of affection when third parties are absent."\n\nMarcus set his glass on the marble side table and placed both hands on the arms of her chair, leaning down until she could feel the heat radiating from his collar. "Then tell me, Gemma... why haven\'t either of us moved away in the last twenty minutes?"'
      },
      {
        id: 'chap-cw-1',
        storyId: 'story-contract-winter',
        number: 1,
        title: 'The Sixty-Fifth Floor',
        durationSeconds: 210,
        publishedAt: 'Oct 20',
        isPremium: false,
        wordCount: 450,
        synopsis: 'Gemma arrives at Sterling Tower during the first blizzard of December.',
        proseExcerpt:
          'Snow flurried in dizzying white spirals against the floor-to-ceiling glass of the sixty-fifth floor. Below, Central Park was disappearing under a pristine shroud of white, but inside Marcus Sterling’s corner office, the silence was absolute.\n\nMarcus did not stand when she entered. He simply pushed a heavy linen-bound folder across the black marble table. "Section 4 outlines public appearances," he said, his baritone smooth and unyielding. "Section 7 specifies privacy. Read them carefully, Miss Hayes."\n\nGemma pulled off her leather gloves, refusing to show the tremor in her fingers. "I know the terms, Marcus. I just need to know if you intend to play by them."'
      },
      {
        id: 'chap-cw-2',
        storyId: 'story-contract-winter',
        number: 2,
        title: 'Terms of Engagement',
        durationSeconds: 220,
        publishedAt: 'Oct 22',
        isPremium: true,
        wordCount: 460,
        synopsis: 'A winter gala introduces the couple to New York high society.',
        proseExcerpt:
          'The emerald velvet gown was heavy and slid against her skin like cold water. When Marcus reached down to adjust the vintage diamond pendant resting at the hollow of her collarbone, his fingertips brushed her skin.\n\nA quiet shiver ran through her that had nothing to do with the winter air. "Remember," he whispered against her ear, smiling for the cameras across the ballroom, "we are supposed to be desperately in love."\n\n"You’re playing the part a little too well," Gemma countered under her breath, tilting her head to meet his intoxicating gaze.'
      },
      {
        id: 'chap-cw-3',
        storyId: 'story-contract-winter',
        number: 3,
        title: 'A Snowbound Evening',
        durationSeconds: 230,
        publishedAt: 'Oct 24',
        isPremium: true,
        wordCount: 480,
        synopsis: 'A citywide transit shutdown leaves them alone in the penthouse.',
        proseExcerpt:
          'The fire crackled in the hearth, casting long amber shadows across the parquet floor. Outside, Manhattan had gone utterly quiet under two feet of snow. Marcus leaned against the kitchen island, holding two glasses of single malt.\n\nFor the first time since they signed the parchment, he wasn’t wearing his tie, his sleeves rolled to his forearms. "You were right about the third clause," he admitted softly.\n\n"Which one?" Gemma asked, surprised.\n\n"The clause where you said we couldn\'t spend nights like this without risking everything."'
      }
    ]
  },
  {
    id: 'story-things-never-said',
    title: 'The Things We Never Said',
    author: 'Eleanor Reed',
    narrator: {
      id: 'narrator-sophie',
      name: 'Sophie Hartwell',
      accent: 'British',
      tone: 'Lyrical, nuanced, emotionally resonant',
      gender: 'female',
    },
    coverImage: BOOK_COVERS.neverSaid,
    synopsis:
      'Working late shifts inside London’s Victorian botanical conservatory, archivist Mira and landscape restorer Callum maintain an unspoken covenant: stay colleagues, protect their fragile friendship. But when an uncataloged collection of Edwardian love letters arrives, their quiet restraint begins to crack.',
    genre: 'Friends to Lovers',
    tropes: ['Friends to Lovers', 'Slow Burn', 'Workplace Romance'],
    status: 'Ongoing',
    totalPlannedChapters: 100,
    publishedChaptersCount: 20,
    totalDurationSeconds: 4800,
    isFeatured: false,
    releasedAt: '2026-09-01',
    updatedAt: '2026-10-25',
    chapters: [
      {
        id: 'chap-tns-3',
        storyId: 'story-things-never-said',
        number: 3,
        title: 'The Forgotten Rose Garden',
        durationSeconds: 230,
        publishedAt: 'Today (Oct 25)',
        isPremium: true,
        wordCount: 490,
        synopsis: 'NEW TODAY: Discovering a secret hidden glasshouse behind the camellias brings an unspoken truth into the light.',
        proseExcerpt:
          'Behind the overgrown camellia wall stood an arched iron doorway that hadn’t been opened in seventy years. Callum wiped the verdigris from the skeleton key and turned it with a satisfying click that echoed through the misty palm house.\n\nMira stepped inside behind him. The air was warm, dense with the heady scent of antique damask roses that bloomed even in the heart of autumn. Above them, raindrops tapped a quiet rhythm on the curved glass dome.\n\n"Callum, look," she breathed, illuminating a stone sundial carved with the inscription: What the heart refuses to speak, the years will tell.\n\nCallum turned, looking down at her in the soft lantern glow. He reached out, his thumb gently smoothing away a stray curl that had fallen across her cheek. "I don\'t want the years to tell it, Mira. I want to tell you myself."'
      },
      {
        id: 'chap-tns-1',
        storyId: 'story-things-never-said',
        number: 1,
        title: 'The Glass Conservatory at Twilight',
        durationSeconds: 200,
        publishedAt: 'Oct 15',
        isPremium: false,
        wordCount: 430,
        synopsis: 'Rain falls against the soaring glass domes of Kew as Mira and Callum catalog the evening blooms.',
        proseExcerpt:
          'The humidity under the wrought iron vaults was fragrant with damp soil, flowering jasmine, and the petrichor of London rain beating against four thousand panes of leaded glass.\n\nCallum was kneeling by the rose arbor, pruning shears in hand, when Mira walked down the brick path holding two steaming mugs of Earl Grey.\n\n"You’re working past closing again," she said, leaning against the damp brickwork.\n\nHe looked up, a slow smile touching his lips. "Only because I knew you wouldn’t leave either."'
      },
      {
        id: 'chap-tns-2',
        storyId: 'story-things-never-said',
        number: 2,
        title: 'Ink and Dried Petals',
        durationSeconds: 215,
        publishedAt: 'Oct 22',
        isPremium: true,
        wordCount: 450,
        synopsis: 'Unboxing an old cedar chest uncovers letters that reflect their own unexpressed feelings.',
        proseExcerpt:
          'Between the brittle pages of an 1894 diary lay a pressed violet. Mira read the faded script aloud: "To love someone in silence is both a sanctuary and an unbearable cage."\n\nCallum paused in his work, the silence between them stretching until every drop of rain on the glass sounded like a heartbeat.\n\n"Do you believe that?" he asked softly, his gaze pinned to hers. "That silence is a sanctuary?"'
      }
    ]
  },
  {
    id: 'story-rosewood-train',
    title: 'The Last Train to Rosewood',
    author: 'Eleanor Reed',
    narrator: {
      id: 'narrator-clara',
      name: 'Eleanor Sterling',
      accent: 'British',
      tone: 'Intimate, warm, evocative',
      gender: 'female',
    },
    coverImage: BOOK_COVERS.rosewoodTrain,
    synopsis:
      'Stranded on a delayed sleeper train cutting through the misty Oregon pines, botanical researcher Laurel finds herself seated across from Owen—the high school sweetheart who left town without saying goodbye ten years ago. As the engine winds deeper into the mountains, ten years of silence dissolve.',
    genre: 'Second Chance',
    tropes: ['Second Chance', 'Small Town Romance', 'Enemies to Lovers'],
    status: 'Completed',
    totalPlannedChapters: 45,
    publishedChaptersCount: 45,
    totalDurationSeconds: 9800,
    isFeatured: false,
    releasedAt: '2026-05-10',
    updatedAt: '2026-09-30',
    chapters: [
      {
        id: 'chap-rt-1',
        storyId: 'story-rosewood-train',
        number: 1,
        title: 'Carriage Number Seven',
        durationSeconds: 210,
        publishedAt: 'Sep 15',
        isPremium: false,
        wordCount: 440,
        synopsis: 'The whistle blows at dusk as Laurel takes her seat in the vintage wood-paneled car.',
        proseExcerpt:
          'Rain streaked diagonally across the double-paned window of Carriage Number Seven. Laurel slid her wool knit scarf onto the brass luggage rack above, exhaling a cloud of steam into the chilled air of the vestibule.\n\nWhen the compartment door slid open, the man entering did not immediately notice her. He had the same broad shoulders, the same slight furrow between his dark brows, but his eyes were weary.\n\n"Laurel?" Owen said, his hand freezing on the brass latch. "Of all the trains in the Pacific Northwest..."'
      },
      {
        id: 'chap-rt-2',
        storyId: 'story-rosewood-train',
        number: 2,
        title: 'Miles Through the Pines',
        durationSeconds: 225,
        publishedAt: 'Sep 20',
        isPremium: true,
        wordCount: 470,
        synopsis: 'As the train climbs the mountain pass, old wounds and unresolved tenderness re-emerge.',
        proseExcerpt:
          'The rhythmic click-clack of the steel rails seemed to count off the years they had wasted. In the dining car, the amber lamp cast a warm halo over their table.\n\n"You never answered my message after graduation," Laurel said evenly, looking straight into his eyes.\n\nOwen looked down at his coffee, then reached across the table to touch her fingers. "I was terrified I wasn\'t enough for you, Laurel. Leaving you is the only thing I\'ve regretted every single day since."'
      }
    ]
  },
  {
    id: 'story-cliffside-vows',
    title: 'The Cliffside Vows',
    author: 'Clara Vance',
    narrator: {
      id: 'narrator-clara',
      name: 'Eleanor Sterling',
      accent: 'British',
      tone: 'Intimate, warm, evocative',
      gender: 'female',
    },
    coverImage: BOOK_COVERS.cliffsideVows,
    synopsis:
      'On the windswept headlands of Cornwall, an estranged couple agrees to spend a final fortnight together to settle an ancestral cottage deed. High above crashing waves and heather-covered cliffs, unresolved passion proves stronger than any legal decree.',
    genre: 'Contemporary',
    tropes: ['Second Chance', 'Slow Burn', 'Small Town Romance'],
    status: 'Ongoing',
    totalPlannedChapters: 80,
    publishedChaptersCount: 16,
    totalDurationSeconds: 4200,
    isFeatured: false,
    releasedAt: '2026-07-20',
    updatedAt: '2026-10-24',
    chapters: [
      {
        id: 'chap-cv-1',
        storyId: 'story-cliffside-vows',
        number: 1,
        title: 'Salt Air and Granite',
        durationSeconds: 215,
        publishedAt: 'Oct 12',
        isPremium: false,
        wordCount: 450,
        synopsis: 'Arrival at the windswept cottage perched above St. Agnes Head.',
        proseExcerpt:
          'The wind came straight off the Atlantic, wild and smelling of cold brine and crushed gorse. Tristan held open the weathered oak door of Penrose Cottage, waiting as Siobhan stepped over the threshold.\n\nFor five years, they had communicated only through solicitors. Now, standing beneath the low-beamed ceiling as gale-force gusts rattled the leaded casements, the polite distance between them began to crack.\n\n"You kept the fireplace ready," she observed quietly.\n\n"I always kept it ready," Tristan replied, shutting the storm door behind them.'
      },
      {
        id: 'chap-cv-2',
        storyId: 'story-cliffside-vows',
        number: 2,
        title: 'The Keeper\'s Lantern',
        durationSeconds: 230,
        publishedAt: 'Oct 18',
        isPremium: true,
        wordCount: 480,
        synopsis: 'A night-time walk to the decommissioned lighthouse brings back memories of their wedding night.',
        proseExcerpt:
          'The beam of his flashlight illuminated the damp granite path. When her boot slipped on the wet slate, Tristan caught her waist with both hands, pulling her against his chest before he could stop himself.\n\nIn the dark, his breath was warm against her hair. "You haven\'t changed your perfume," he whispered.\n\nSiobhan felt the steady drum of his heart beneath his wool sweater. "And you still hold on too tightly."'
      }
    ]
  }
];

export const BROWSE_MOODS = [
  { id: 'Slow Burn', name: 'Slow Burn', count: 18, description: 'Simmering tension and emotional depth' },
  { id: 'Second Chance', name: 'Second Chance', count: 14, description: 'Rekindled passion and healed pasts' },
  { id: 'Enemies to Lovers', name: 'Enemies to Lovers', count: 22, description: 'Sharp wit, fierce rivalry, undeniable heat' },
  { id: 'Billionaire Romance', name: 'Billionaire Romance', count: 12, description: 'High-stakes glamour and powerful attraction' },
  { id: 'Small Town Romance', name: 'Small Town Romance', count: 16, description: 'Cozy intimacy, community, and fresh starts' },
  { id: 'Forbidden Love', name: 'Forbidden Love', count: 9, description: 'Dangerous secrets and stolen moments' },
  { id: 'Friends to Lovers', name: 'Friends to Lovers', count: 15, description: 'A lifelong bond tested by sudden desire' },
  { id: 'Workplace Romance', name: 'Workplace Romance', count: 11, description: 'Late-night meetings and office chemistry' },
];

export const RECENT_CHAPTERS = [
  {
    storyId: 'story-summer-stayed',
    storyTitle: 'The Summer We Almost Stayed',
    coverImage: BOOK_COVERS.summerStayed,
    chapterNumber: 5,
    chapterTitle: 'The Harbor Lanterns at Midnight',
    durationSeconds: 240,
    publishedAt: 'Today (Oct 25)',
    isNewToday: true,
    isPremium: true,
    narratorName: 'Eleanor Sterling',
  },
  {
    storyId: 'story-contract-winter',
    storyTitle: 'A Contract Written in Winter',
    coverImage: BOOK_COVERS.contractWinter,
    chapterNumber: 4,
    chapterTitle: 'Whispers in the Snow',
    durationSeconds: 245,
    publishedAt: 'Today (Oct 25)',
    isNewToday: true,
    isPremium: true,
    narratorName: 'James Montgomery',
  },
  {
    storyId: 'story-things-never-said',
    storyTitle: 'The Things We Never Said',
    coverImage: BOOK_COVERS.neverSaid,
    chapterNumber: 3,
    chapterTitle: 'The Forgotten Rose Garden',
    durationSeconds: 230,
    publishedAt: 'Today (Oct 25)',
    isNewToday: true,
    isPremium: true,
    narratorName: 'Sophie Hartwell',
  },
  {
    storyId: 'story-summer-stayed',
    storyTitle: 'The Summer We Almost Stayed',
    coverImage: BOOK_COVERS.summerStayed,
    chapterNumber: 4,
    chapterTitle: 'The Blue Hour Promise',
    durationSeconds: 215,
    publishedAt: 'Yesterday',
    isNewToday: false,
    isPremium: true,
    narratorName: 'Eleanor Sterling',
  },
  {
    storyId: 'story-contract-winter',
    storyTitle: 'A Contract Written in Winter',
    coverImage: BOOK_COVERS.contractWinter,
    chapterNumber: 3,
    chapterTitle: 'A Snowbound Evening',
    durationSeconds: 230,
    publishedAt: '2 days ago',
    isNewToday: false,
    isPremium: true,
    narratorName: 'James Montgomery',
  },
];
