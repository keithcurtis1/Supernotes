This was about 15% written by me, adapted from code written by the Aaron.

This script pulls the contents from a token's GM Notes field. If the token represents a character, you can optionally pull in the Bio or GM notes from the character. The user can decide whether to whisper the notes to the GM or broadcast them to all players. Finally, there is the option to add a footer to notes whispered to the GM. This footer creates a chat button to give the option of sending the notes on to the players.
This script as written is optimized for the D&D 5th Edition by Roll20 sheet, but can be adapted easily suing the Configuration section below.

**Commands:**
**!gmnote** whispers the note to the GM
**!pcnote** sends the note to all players

**Paramaters**
*--token* Pulls notes from the selected token's gm notes field. This is optional. If it is missing, the script assumes --token
*--charnote* Pulls notes from the gm notes field of the character assigned to a token.
*--bio* Pulls notes from the bio field of the character assigned to a token.

**Configuration**
The script has a number of options at the beginning that you can use to customize to your chosen sheet. As written, it is configured for the D&D 5th Edition by Roll20 sheet. The first three are the names of fields used by the roll template of your choice. the last is true or false, used to toggle whether you want the "send to players" footer button to appear.

template = name of roll template, default is 'npcaction'
const title = name of title or name field used by roll template, default is 'rname'
const theText = name of text field used by roll template, default is 'description'
const sendToPlayers = whether to use the "send to players" footer button, default is true

**Alternate configurations:**
**Default Template**
            const template = 'default';
            const title = 'name'
            const theText = ' '

**5e Shaped**
            const template = '5e-shaped';
            const title = 'title'
            const theText = 'text_big'

**Pathfinder Community**
            const template = 'pf_generic';
            const title = 'name'
            const theText = 'description'

**Pathfinder Official**
            const template = 'npc';
            const title = 'name'
            const theText = 'descflag=1}} {{desc'

**Pathfinder 2e**
            const template = 'npc';
            const title = 'name'
            const theText = 'descflag=1}} {{desc'

**Starfinder**
            const template = 'sf_generic';
            const title = 'title'
            const theText = 'buttons0'
