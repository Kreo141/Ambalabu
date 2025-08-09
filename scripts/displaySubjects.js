$(document).ready(async function(){
    
    const dateOptions = {
        timeZone: 'Asia/Manila',
        weekday: 'long',  
    };

    const now = new Date()
    const dateFormatter = new Intl.DateTimeFormat('en-PH', dateOptions);
    const dayToday = dateFormatter.format(now);

    
    async function fetchSubjects(){
        try {
            const res = await fetch('/requestSubjects')
            const data = await res.json()
            return data
        } catch (err) {
            console.error(err)
            return []
        }
    }
    
    var subjects = await fetchSubjects()
    console.log(subjects)

    subjects.forEach(subject => {
        const subjectDays = subject.days

        for (var x = 0; x < subjectDays.length; x += 3){

            var day = subjectDays.slice(x, x + 3)
    
            if (day == dayToday.slice(0, 3)){
                $('.SubjectContainer').append(
                `
                <div class="subject ${subject.subjectId}">
                    <p class="subjectName">${subject.subjectName}</p>
                    <p class="roomName">${subject.room}</p>
                    <p class="subjectTime">${subject.time}</p>
                </div>
                `)
            }

        }
    });
})

function log(log){
    console.log(log)
}