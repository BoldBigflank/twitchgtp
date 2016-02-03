console.log("index.js loaded");

PUBNUB_object.subscribe({
    channel: channelName,
    message: function(m){
        console.log(m);
        if(m.action == "entry"){
            $("#entries").append(
                "<tr class='entry" + m.index + " '><td>!vote " + m.index + "</td><td>"+ m.entry +"</td><td><span class='votes'>0</span></td></tr>"
            );
        }
        
        if(m.action == "vote") {
            var score = $(".entry" + m.index + " .votes");
            score.html( ( parseInt( score.html() ) + 1 ) );
        }
    }
});
