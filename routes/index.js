var express = require('express');
var router = express.Router();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sentiment Analysis~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var retext = require('retext');
var inspect = require('unist-util-inspect');
var sentiment = require('retext-sentiment');

var testString = "I was thrilled to be back @LibertyU. Congratulations to the Class of 2017! This is your day, and you've earned it.";
var rootNode;

retext()
    .use(sentiment)
    .use(function () {
        return transformer;
        function transformer(tree) {
            rootNode = tree;
            //console.log(inspect(tree));
        }
    }).processSync(testString);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of Sentiment Analysis~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Here It Is|' });
});


/* GET trump page. */
router.get('/trump', function (req, res) {
    var db = req.db;
    var collection = db.get('Ceong');
    const users = db.get('Ceong');
    users.remove({});
    //Value of entire string is Math.abs(rootNode.data.polarity)

    //Create all shapes per word, whitespace, or punctuation
    //Positive words: Circles
    //Neutral words: Triangles
    //Negative words: Upside-Down Crosses
    //For positive colors, please refer to the Positive Color Palette
    //For negative colors, please refer to the Negative Color Palette
    //For neutral colors, please refer to the Neutral Color Palette

    //Loop through all string nodes
    //console.log(inspect(rootNode.children[0].children[0]));
    for (var x = 0; x < rootNode.children[0].children.length; x++) {
        //If children in node, then it is not whitespace.
        if ("children" in rootNode.children[0].children[x]) {
            //console.log(inspect(rootNode.children[0].children[x]));
            for (var i = 0; i < rootNode.children[0].children[x].children.length; i++) {
                //console.log("INSPECTING " + inspect(rootNode.children[0].children[2]));
                //If string node has children, then terminal is not whitespace or punctuation node
                if ("children" in rootNode.children[0].children[x].children[i]) {
                    //Create new shape object
                    var newShapeObject = {};
                    //If string node has data, then terminal has sentiment value
                    if ("data" in rootNode.children[0].children[x].children[i].children[0]) {
                        //console.log("Sentiment Value Detected");
                        //console.log("WORD: " + rootNode.children[0].children[0].children[i].children[0].value);
                        //console.log("VALUE: " + rootNode.children[0].children[0].children[i].children[0].data.polarity);

                        //If positive
                        if (rootNode.children[0].children[x].children[i].children[0].data.valence === 'positive') {
                            newShapeObject.word = rootNode.children[0].children[x].children[i].children[0].value;
                            newShapeObject.shape = 'Circle';
                            //Size depends on how positive the element is
                            newShapeObject.size = rootNode.children[0].children[x].children[i].children[0].data.polarity;
                            //Color deends on how positve the element is
                            newShapeObject.color = positiveColors[rootNode.children[0].children[x].children[i].children[0].data.polarity];
                            //console.log("HERE WE ARE POSITIVE");
                            users.insert(newShapeObject);
                        }
                        //If negative
                        if (rootNode.children[0].children[x].children[i].children[0].data.valence === 'negative') {
                            newShapeObject.word = rootNode.children[0].children[x].children[i].children[0].value;
                            newShapeObject.shape = 'Cross';
                            newShapeObject.size = Math.abs(rootNode.children[0].children[x].children[i].children[0].data.polarity);
                            newShapeObject.color = negativeColors[Math.abs(rootNode.children[0].children[x].children[i].children[0].data.polarity)];
                            users.insert(newShapeObject);
                        }
                    }
                    //If node does not have data, then node is neutral
                    else {
                        //console.log("No Sentiment Value");
                        //console.log("WORD: " + rootNode.children[0].children[0].children[i].children[0].value);
                        //If neutral, then shape is triangle
                        newShapeObject.word = rootNode.children[0].children[x].children[i].children[0].value;
                        newShapeObject.shape = 'Triangle';
                        //If neutral, then size is 1
                        newShapeObject.size = 1;
                        //If neutral, then color is randomly chosen from neutral colors
                        //console.log("Color: " + (Math.floor(Math.random() * 4) + 1));
                        newShapeObject.color = neutralColors[Math.floor(Math.random() * 4) + 1];
                        users.insert(newShapeObject);
                    }
                }
            }
        }
    }
    //users.insert(newShapeObject);
    console.log(rootNode.data.polarity + " This is the data....");
    users.find({}, {}, function (e, docs) {
        res.render('trump', {
            "datalist": docs
        });
    });
});


//Negative Color Palettes
var negativeColors = {
    1: '#bdc3c7',
    2: '#7f8c8d',
    3: '#95a5a6',
    4: '#34495e'
};

//Positive Color Palette
var positiveColors = {
    1: '#F48FB1',
    2: '#BA68C8',
    3: '#7E57C2',
    4: '#2196F3'
};

//Neutral Color Palette
var neutralColors = {
    1: '#E8F5E9',
    2: '#F9FBE7',
    3: '#FFF8E1',
    4: '#ECEFF1'
};

module.exports = router;