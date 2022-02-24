var express = require( 'express' );
var multer = require( 'multer' );
var cors = require( 'cors' );
const app = express();
app.use( cors() );

const fileStorageEngine = multer.diskStorage( {
    destination: ( req, file, cb ) => {
        cb( null, "./uploads" );
    },
    filename: ( req, file, cb ) => {
        cb( null, Date.now() + ".." + file.originalname );
    },
})
const upload = multer({ storage: fileStorageEngine });

// const upload = multer({ dest: "./uploads" });

app.post( '/upload', upload.array('myUploadedFile', 12), ( req, res ) => {
    console.log( req.files );
    //validate request
    const files = req.files
    if (!files) {
        res.status( 500 ).json( {
            message: "Empty Upload",
            status: "FAILED"
        })
    }
    
    res.setHeader( "Access-Control-Allow-Origin", "*" );
    res.end( "SUCCESS" );
    

} );

app.listen( 3000, () => {
    console.log('listening on port: 3000')
})

