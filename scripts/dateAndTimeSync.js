$(document).ready(function(){

    console.log("dateAndTimeSync.js INIT")

    var timeElement = $(".timeNow")
    var dateElement = $(".dateNow")
    
    const timeOptions = {
        timeZone: 'Asia/Manila',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }

    const dateOptions = {
        timeZone: 'Asia/Manila',
        weekday: 'long',  
        year: 'numeric',
        month: 'long',     
        day: '2-digit'
    };

    async function updateTime(){
        const now = new Date()

        const timeFormatter = new Intl.DateTimeFormat('en-PH', timeOptions)
        const dateFormatter = new Intl.DateTimeFormat('en-PH', dateOptions);

        const formattedTime = timeFormatter.format(now);
        const formattedDate = dateFormatter.format(now);
        
        $(timeElement).text(formattedTime)
        $(dateElement).text(formattedDate)
    }

    
    function convertTo24Hour(timeStr) {
        let [time, modifier] = timeStr.split(" ")
        let [hours, minutes, seconds] = time.split(":")
        
        hours = parseInt(hours, 10)
        
        if (modifier === "PM" && hours !== 12) {
            hours += 12
        } else if (modifier === "AM" && hours === 12) {
            hours = 0
        }
        
        return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`
    }
    
    var celestialBody = $(".sunShape")

    async function updateCelestialBody(){
        const now = new Date()
        
        const timeFormatter = new Intl.DateTimeFormat('en-PH', timeOptions)
        const formattedTime = timeFormatter.format(now)

        var date = new Date("1970-01-01T" + convertTo24Hour(formattedTime))

        var hour = date.getHours()

        if (hour >= 5 && hour < 18) {
            $(celestialBody).css({
                "background-color": "#FFA600",
                "box-shadow": "0px 0px 100px 10px #FFD900"
            })
        } else {
            $(celestialBody).css({
                "background-color": "white",
                "box-shadow": "0px 0px 100px 20px #FFFFFF"
            })
            $(".ClassScheduleContainer").css(
                "background-image", "radial-gradient(circle at -50% 50%, #3870ff, rgb(0, 0, 0) )"
            )
        }


    }

    updateTime()
    updateCelestialBody()

    setInterval(updateTime, 1000) 
    setInterval(updateCelestialBody, 2000)
})