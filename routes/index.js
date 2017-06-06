var express = require('express');
var router = express.Router();

//-------------------------------------------
// Information for the twitter API
//-------------------------------------------
var Twit = require('twit');
var countLimit = 9;

var T = new Twit({
    //PUT TWITTER INFO HERE
    consumer_key: 'uo8Ex8A6kPqQSTU9mQ4JEDCwA',
    consumer_secret: 'eoAftf2tIevLIxizgY7ku4qwn9lkVJtC8PbppR30ye0Kp89D3S',
    access_token: '835704017384685569-946BgoVOlUWSNXhCmFKwNNDm2FCzwYz',
    access_token_secret: '5equQy78EhdnBOXWrhvtUCd6EW4Y4f7Lqfzyeg4EEDB6Z',
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
})
//-------------------------------------------
// END of Information for the twitter API
//-------------------------------------------



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sentiment Analysis~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var retext = require('retext');
var inspect = require('unist-util-inspect');
var sentiment = require('retext-sentiment');
//Each rootNode holds one tweet string and sentiment data per tweet
var rootNode = [];
grabTweet();
function grabTweet() {
    T.get('statuses/user_timeline', { screen_name: 'DalaiLama', count: countLimit }, function (err, data, response) {
        for (var i = 0; i < countLimit; i++) {
            console.log("The tweet....\n" + data[i].text.replace(/\bhttp\S+/ig, "") + "\n");
            retext()
                .use(sentiment)
                .use(function () {
                    return transformer;
                    function transformer(tree) {
                        rootNode[i] = tree;
                        console.log(inspect(tree));
                    }
                }).processSync(data[i].text.replace(/\bhttp\S+/ig, ""));
        }
    });
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of Sentiment Analysis~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Here It Is|' });
});


/* GET trump page. */
router.get('/trump', function (req, res) {
    grabTweet();
    //Value of entire string is Math.abs(rootNode[z].data.polarity)

    //Create all shapes per word
    //Positive words: Circles
    //Neutral words: Triangles
    //Negative words: Upside-Down Crosses
    //For positive colors, please refer to the Positive Color Palette
    //For negative colors, please refer to the Negative Color Palette
    //For neutral colors, please refer to the Neutral Color Palette

    var db = req.db;
    var collection = db.get('Ceong');
    const users = db.get('Ceong');
    users.remove({});
    //Loop through all string nodes
    for (var z = 0; z < countLimit; z++) {
        for (var x = 0; x < rootNode[z].children[0].children.length; x++) {
            if ("children" in rootNode[z].children[0].children[x]) {
                for (var i = 0; i < rootNode[z].children[0].children[x].children.length; i++) {
                    //If string node has children, then terminal is not whitespace or punctuation node
                    if ("children" in rootNode[z].children[0].children[x].children[i]) {
                        //If string node has data, then terminal has sentiment value
                        if ("data" in rootNode[z].children[0].children[x].children[i].children[0]) {

                            //If positive
                            if (rootNode[z].children[0].children[x].children[i].children[0].data.valence === 'positive') {
                                var newShapeObject = {};
                                newShapeObject.word = rootNode[z].children[0].children[x].children[i].children[0].value;
                                newShapeObject.shape = 'Circle';
                                //Size depends on how positive the element is
                                newShapeObject.size = rootNode[z].children[0].children[x].children[i].children[0].data.polarity;
                                //Color deends on how positve the element is
                                newShapeObject.color = positiveColors[rootNode[z].children[0].children[x].children[i].children[0].data.polarity];
                                newShapeObject.canvas = z;
                                users.insert(newShapeObject);
                            }
                            //If negative
                            if (rootNode[z].children[0].children[x].children[i].children[0].data.valence === 'negative') {
                                var newShapeObject = {};
                                newShapeObject.word = rootNode[z].children[0].children[x].children[i].children[0].value;
                                newShapeObject.shape = 'Cross';
                                newShapeObject.size = Math.abs(rootNode[z].children[0].children[x].children[i].children[0].data.polarity);
                                newShapeObject.color = negativeColors[Math.abs(rootNode[z].children[0].children[x].children[i].children[0].data.polarity)];
                                newShapeObject.canvas = z;
                                users.insert(newShapeObject);
                            }
                        }
                        //If node does not have data, then node is neutral
                        else {
                            //If neutral, then shape is triangle
                            console.log("INSPECTING :" + inspect(rootNode[z].children[0].children[x].children[i].children[0]));
                            console.log("Neutral word found !!! for canvas " + z);
                            var newShapeObject = {};
                            newShapeObject.word = rootNode[z].children[0].children[x].children[i].children[0].value;
                            newShapeObject.shape = 'Triangle';
                            //If neutral, then size is 1
                            newShapeObject.size = 1;
                            //If neutral, then color is randomly chosen from neutral colors
                            newShapeObject.color = neutralColors[Math.floor(Math.random() * 4) + 1];
                            newShapeObject.canvas = z;
                            console.log("New shape neutral object : " + newShapeObject);
                            users.insert(newShapeObject);
                        }
                    }
                }
            }
        }
    }

    users.find({}, {}, function (e, docs) {
        res.render('trump', {
            "datalist": docs
        });
    });
});


//Negative Color Palettes
var negativeColors = {
    1: '#e9c7c1',
    2: '#ec606a',
    3: '#aa001d',
    4: '#750408',
    5: '#220307'
};

//Positive Color Palette
var positiveColors = {
    1: '#afeeee',
    2: '#5dd3e9',
    3: '#0194fe',
    4: '#012b7e',
    5: '#011149'
};

//Neutral Color Palette
var neutralColors = {
    1: '#E8F5E9',
    2: '#F9FBE7',
    3: '#FFF8E1',
    4: '#ECEFF1'
};

module.exports = router;