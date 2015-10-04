declare module 'slack-client' {
    import { EventEmitter } from 'events';

    class Client extends EventEmitter {
        constructor(token: string, autoReconnect?: boolean, autoMark?: boolean);

        self: User;
        team: Team;

        channels: Channel[];
        dms: any[];
        groups: Group[];
        users: User[];
        bots: Bot[];

        socketUrl: string;

        login();
        connect();
        disconnect();
        reconnect();

        joinChannel(name: string, callback: Function);
        openDM(user_id: string, callback: Function);

        createGroup (name: string, callback: Function);

        setPresence(presence, callback);
        setActive(callback);

        getUserByID(id): User;
        getUserByName(name: string): User;
        getChannelByID(id): Channel;
        getChannelByName(name: string): Channel;
        getDMByID(id);
        getDMByName(name: string);
        getGroupByID(id): Group;
        getGroupByName(name: string): Group;
        getChannelGroupOrDMByID(id): Channel|Group|DM;
        getChannelGroupOrDMByName(name: string)

        getUnreadCount(): number;

        getChannelsWithUnreads(): Channel[];
    }

    interface Channel {

        id: number;
        topic: string;
        purpose: string;
        name: string;
        members: User[];
        unread_count: number;
        latest: Message;

        addMessage(message);
        getHistory();

        startedTyping(user_id: number);
        getTyping();

        send(text: string);
        postMessage(data);
        sendMessage(message);
        fetchHistory(latest, oldest);

        mark(ts);
        leave();

        setTopic(topic: string);
        setPurpose(purpose: string);
        rename(name: string);
        invite(user_id: number);
    }

    interface Group extends Channel {
        close();
        open();
        archive();
        unarchive();
    }

    interface DM extends Channel {
        close();
    }

    interface Team {
        name: string;
    }
    interface User {
        name: string;
    }
    interface Bot {
        name: string;
    }

    interface Message {

        id: number;
        type: string;
        channel: Channel;
        text: string;
        user: User;
        username: string;

        toJSON();
        getBody(): string;
        toString(): string;
        getChannelType();
        updateMessage(new_text: string);
        deleteMessage();
    }

    export = Client;
}
