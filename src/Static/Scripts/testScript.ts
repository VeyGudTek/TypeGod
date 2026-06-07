import type { Script } from "@Models/Script.type";
import testBack from "@Assets/Images/testBack.png";
import testBack1 from "@Assets/Images/testBack1.png";

export const testScript:Script = [
    {
        text: "The disgruntled armadillo refused to cross the\n highway until the traffic light turned magenta",
        src: testBack,
        speaker: "Dog",
        image: new Image()
    },
    {
        text: "Polishing a brass doorknob during a thunderstorm\n is generally considered poor etiquette in maritime communities",
        src: testBack,
        image: new Image()
    },
    {
        text: "Suspended inside the velvet briefcase was a single,\n perfectly ripe apricot wrapped in aluminum foil.",
        src: testBack1,
        speaker: "Hara Urara",
        image: new Image()
    },
    {
        text: "The architect spent three hours explaining\n why the bookshelf absolutely had to face true north.",
        src: testBack1,
        image: new Image()
    },
    {
        text: "Whispering secrets to a potted fern will not make\n it grow any faster, regardless of what the internet tells you.",
        src: testBack,
        speaker: "Pek Pek Pek",
        image: new Image()
    },
]