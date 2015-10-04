// Based on http://blog.somewhatabstract.com/2015/03/02/writing-a-simple-slack-bot-with-node-slack-client/

import Client = require('slack-client');

const token = process.env['SLACK_TOKEN'];
const slack = new Client(token);

slack.on('open', function() {
    var channels = Object.keys(slack.channels)
        .map(k => slack.channels[k])
        .filter(c => c.is_member)
        .map(c => c.name);

    var groups = Object.keys(slack.groups)
        .map(k => slack.groups[k])
        .filter(g => g.is_open && !g.is_archived)
        .map(g => g.name);

    console.log(`Welcome to Slack. You are ${slack.self.name} of ${slack.team.name}`);

    if (channels.length > 0) {
        console.log(`You are in: ${channels.join(', ') }`);
    }
    else {
        console.log('You are not in any channels.');
    }

    if (groups.length > 0) {
        console.log(`As well as: ${groups.join(', ') }`);
    }
});

slack.on('message', (message) => {

    console.log(`I heard ${JSON.stringify(message)}`);

    let channel = slack.getChannelGroupOrDMByID(message.channel);
    let user = slack.getUserByID(message.user);

    if (message.text.includes('bye')) {
        channel.send('Disconnecting');
        slack.disconnect();
    }
});

slack.login();