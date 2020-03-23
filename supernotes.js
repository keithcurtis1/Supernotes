on('ready', () => {
    // Set these values for template of choice and toggle the value of sendToPlayers if you want a fotter button to pass the message on to players
    const template = 'npcaction';
    const title = 'rname';
    const theText = 'description';
    const sendToPlayers = true;

    const decodeUnicode = (str) => str.replace(/%u[0-9a-fA-F]{2,4}/g, (m) => String.fromCharCode(parseInt(m.slice(2), 16)));

    on('chat:message', function(msg) {
        if ('api' === msg.type && msg.content.match(/^!(gm|pc)note/) && playerIsGM(msg.playerid)) {
            let match = msg.content.match(/^!gmnote-(.*)$/),
            regex;

            //define command                     
            let command = msg.content.split(/\s+--/)[0];


            let messagePrefix = '/w gm ';
            if (command === '!pcnote') {
                messagePrefix = '';
            }

            //define option
            let option = msg.content.split(/\s+--/)[1];
            if ((option !== 'bio' && option !== 'charnote') || (option === undefined)) {
                //|| (option === undefined
                    option = 'token';
            }


            let playerButton = '';
            if (sendToPlayers && command === '!gmnote') {
                playerButton = '\n[Send to Players](!pcnote --' + option + ')';
            }


            if (match && match[1]) {
                regex = new RegExp(`^${match[1]}`, 'i');
            }

            let message = '';
            let whom = '';
            if ((option === 'bio')||(option === 'charnote')) {
                let suboption = (option === 'charnote') ? 'gmnotes' : 'bio';

                _.chain(msg.selected)
                .map(s => getObj('graphic', s._id))
                .reject(_.isUndefined)
                .map(t => getObj('character', t.get('represents')))
                .reject(_.isUndefined)
                .each(c => c.get(suboption, (val) => {
                    if (null !== val && 'null' !== val && val.length > 0) {
                        if (regex) {
                            message = _.filter(
                                decodeUnicode(val).split(/(?:[\n\r]+|<br\/?>)/),
                                (l) => regex.test(l.replace(/<[^>]*>/g, ''))
                            ).join('\r');
                        } else {
                            message = decodeUnicode(val);
                        }
                        whom = c.get('name');
                    }
                }));
            } else {
                _.chain(msg.selected)
                .map(s => getObj('graphic', s._id))
                .reject(_.isUndefined)
                .reject((o) => o.get('gmnotes').length === 0)
                .each(o => {
                    if (regex) {
                        message = _.filter(decodeURIComponent(decodeUnicode(o.get('gmnotes'))).split(/(?:[\n\r]+|<br\/?>)/), (l) => regex.test(l)).join('\r');
                    } else {
                        message = decodeURIComponent(decodeUnicode(o.get('gmnotes')));
                    }
                    whom = o.get('name');

                });

            }

            //Sends the final message
            sendChat(whom, messagePrefix + '&{template:' + template + '}{{' + title + '=' + whom + '}} {{' + theText + '=' + message + playerButton + '}}');

            [
                `### REPORT###'}`,
                `THE MESSAGE =${message}`,
                `command = ${command}`,
                `option = ${option}`,
                `messagePrefix = ${messagePrefix}`,
                `message =${message}`
            ].forEach(m=>log(m));

        }
    });
});
