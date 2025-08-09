const http = require('http')
const fs = require('fs')
const path = require('path')
const pool = require('./db')

const PORT = process.env.PORT || 3000;

const pages = path.join(__dirname, 'pages') 
const styles = path.join(__dirname, 'styles')
const scripts = path.join(__dirname, 'scripts')

const PAGE_home = path.join(pages, 'home.html')
const STYLE_home = path.join(styles, 'homeStyle.css')
const SCRIPT_dateAndTimeSynce = path.join(scripts, 'dateAndTimeSync.js')
const SCRIPT_displaySubjects = path.join(scripts, 'displaySubjects.js')

const server = http.createServer((req, res) => {
    if(req.url == "/home" || req.url == "/"){
        fs.readFile(PAGE_home, (err, data) => {
            if (err) {
                console.log(__filename + `: Error reading ${PAGE_home}` )
                res.writeHead(500)
                return res.end(`Error Loading ${PAGE_home}`)
            } 
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(data)
        })
    } 

    else if (req.url == "/homeStyle"){
        fs.readFile(STYLE_home, (err, data) => {
            if (err) {
                console.log(__filename + `: Error reading ${STYLE_home}`)
                res.writeHead(500)
                return res.end(`Error loading ${STYLE_home}`)
            }

            res.writeHead(200, {"Content-Type": "text/css"})
            res.end(data)
        })
    }
    
    else if (req.url == "/dateAndTimeSync"){
        fs.readFile(SCRIPT_dateAndTimeSynce, (err, data) => {
            if (err) {
                console.log(__filename + `: Error reading ${SCRIPT_dateAndTimeSynce}`)
                res.writeHead(500)
                return res.end(`Error loading ${SCRIPT_dateAndTimeSynce}`)
            }
            
            res.writeHead(200, {"Content-Type": "text/javascript"})
            res.end(data)
        })
    }
    
    else if (req.url == "/displaySubjects"){
        fs.readFile(SCRIPT_displaySubjects, (err, data) => {
            if (err) {
                console.log(__filename + `: Error reading ${SCRIPT_displaySubjects}`)
                res.writeHead(500)
                return res.end(`Error loading ${SCRIPT_displaySubjects}`)
            }
            
            res.writeHead(200, {"Content-Type": "text/javascript"})
            res.end(data)
        })
    }
    
    
    else if (req.url == '/requestSubjects'){
        pool.query('SELECT * FROM "tblSubject";', (err, result) => {
            if (err) {
                res.end(JSON.stringify({ error: "Error retrieving subjects:", err }))
                return
            }
            console.log(JSON.stringify(result.rows))
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify(result.rows))
        })
    }


    else {
        res.writeHead(404)
        res.end("Error: not found")
    }
})

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Website is running on localhost:${PORT}`)

})

