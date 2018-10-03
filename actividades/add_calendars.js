ics_sources = [
    {
        name: 'Frontend-Developers-GT',
        sig: '19e29ff62767572f3e8c45ab14eba1617df8eca4',
        event_properties:{
            color:'#1a4876'
        }
    },
    {
        name: 'Software-QA-and-Testing-Guatemala',
        sig: 'f7e8e501bf37523441850f1d81fa43b25913e40e',
        event_properties:{
            color:'#7e5fa4'
        }
    },
    {
        name: 'AWS-Guatemala',
        sig: '629bc5bf4ef7aa5b578d6089d42965482b77d693',
        event_properties:{
            color:'#ff753b'
        }
    },
    {
        name: 'Azure-Guatemala',
        sig: 'd6bc8a48883c22150b516c8059a29bf8ce6e64e1',
        event_properties:{
            color:'#3a87ad'
        }
    },
    {
        name: 'Guatemala-Blockchain-Developers',
        sig: '02c910b574284153aaef101305ebb10bc50d709c',
        event_properties:{
            color:'#647157'
        }
    },
    {
        name: 'Kubernetes-Guatemala',
        sig: 'f2a57e5d1bbbf644b644385eece604a654de388c',
        event_properties:{
            color:'#6B310C'
        }
    },
    {
        name: 'Asociacion-de-Informatica-de-Guatemala-ADIG',
        sig: '999aa19e4e493aab9e3938abd8787bc4a1053947',
        event_properties: {
            color:'#0c3955'
        }
    },
    {
        name: 'Big-Data-Guatemala',
        sig: '71450d4e144295717f6534a4b4efd7e9242b0d5e',
        event_properties: {
            color:'#ec7676'
        }
    },
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
    var apiUrl = 'https://api.meetup.com/' + ics.name + '/events';
    $.ajax({
        url: apiUrl,
        headers: {
            'Authorization': 'Bearer ' + '4e7d112e337c5346367928406143176e'
        },
        data: {
            'photo-host': 'public',
            'page': '20',
            'sig_id': '182615343',
            'status': 'past,upcoming',
            'no_earlier_than': '2018-06-01T00:00:00.000'
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

