ics_sources = [
    {url:'https://api.meetup.com/Frontend-Developers-GT/events?photo-host=public&page=20&sig_id=182615343&status=past%2Cupcoming&sig=19e29ff62767572f3e8c45ab14eba1617df8eca4&no_earlier_than=2018-06-01T00%3A00%3A00.000', event_properties:{color:'#1a4876'}},
    {url:'https://api.meetup.com/Software-QA-and-Testing-Guatemala/events?photo-host=public&page=20&sig_id=182615343&status=past%2Cupcoming&sig=f7e8e501bf37523441850f1d81fa43b25913e40e&no_earlier_than=2018-06-01T00%3A00%3A00.000', event_properties:{color:'#7e5fa4'}},
    {url:'https://api.meetup.com/AWS-Guatemala/events?photo-host=public&page=20&sig_id=182615343&status=past%2Cupcoming&sig=629bc5bf4ef7aa5b578d6089d42965482b77d693&no_earlier_than=2018-06-01T00%3A00%3A00.000', event_properties:{color:'#ff753b'}},
    {url:'https://api.meetup.com/Azure-Guatemala/events?photo-host=public&page=20&sig_id=182615343&status=past%2Cupcoming&sig=d6bc8a48883c22150b516c8059a29bf8ce6e64e1&no_earlier_than=2018-06-01T00%3A00%3A00.000', event_properties:{color:'#3a87ad'}},
    {url:'https://api.meetup.com/Guatemala-Blockchain-Developers/events?photo-host=public&page=20&sig_id=182615343&status=past%2Cupcoming&sig=02c910b574284153aaef101305ebb10bc50d709c&no_earlier_than=2018-06-01T00%3A00%3A00.000', event_properties:{color:'#647157'}},
    {url:'https://api.meetup.com/Kubernetes-Guatemala/events?photo-host=public&page=20&sig_id=182615343&status=past%2Cupcoming&sig=f2a57e5d1bbbf644b644385eece604a654de388c&no_earlier_than=2018-06-01T00%3A00%3A00.000', event_properties:{color:'#6B310C'}},
    {url:'https://api.meetup.com/Asociacion-de-Informatica-de-Guatemala-ADIG/events?photo-host=public&page=20&sig_id=182615343&status=past%2Cupcoming&sig=999aa19e4e493aab9e3938abd8787bc4a1053947&no_earlier_than=2018-06-01T00%3A00%3A00.000', event_properties:{color:'#0c3955'}},
]


function data_req (url, callback) {
    req = new XMLHttpRequest()
    req.addEventListener('load', callback)
    req.open('GET', url)
    req.send()
}

function add_recur_events() {
    if (sources_to_load_cnt < 1) {
        $('#calendar').fullCalendar('addEventSource', expand_recur_events)
    } else {
        setTimeout(add_recur_events, 30)
    }
}

function load_ics(ics){
    $.ajax({
        url: ics.url,
        headers: {
            'Authorization': 'Bearer ' + '4e7d112e337c5346367928406143176e'
        },
        type: "GET",
        dataType: "jsonp",
        success: function(respuesta){
            var eventsToAdd = respuesta.data.map( event => {
                return {
                    title: event.name,
                    start: moment(event.time).format('YYYY-MM-DD HH:mm:ss'),
                    url: event.link
                };
            });

            $('#calendar').fullCalendar('addEventSource', {
                events: eventsToAdd,
                ...ics.event_properties
            })
            sources_to_load_cnt -= 1
        }
    });
}

$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'month',
        defaultDate: new Date(),
        locale: 'es',
    })
    sources_to_load_cnt = ics_sources.length
    for (ics of ics_sources) {
        load_ics(ics)
    }
    add_recur_events()
})

