const axios = require("axios");
const xml2js = require("xml2js");

const parser = new xml2js.Parser({ explicitArray: false });

exports.getDataBGG = async (req, res) => {
  const query = req.query.query;
  const BGG_URL = process.env.BGG_URL;
  try {
    const resultXml = await axios.get(`${BGG_URL}/search?query=${query}`);
    parser.parseString(resultXml.data, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Error parsing XML to JSON" });
      } else {
        JSON.stringify(result, null, 2);
        res.json(result);
      }
    });
  } catch (error) {
    res.status(501).json("Error:Unable fetch data");
  }
};

exports.getDatabyId = async (req, res) => {
  const id = req.query.id;
  const BGG_URL = process.env.BGG_URL;
  try {
    const resultXml = await axios.get(`${BGG_URL}/thing?id=${id}`);
    parser.parseString(resultXml.data, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Error parsing XML to JSON" });
      } else {
        JSON.stringify(result, null, 2);
        res.json(result);
      }
    });
  } catch (error) {
    res.status(501).json("Error:Unable fetch data");
  }
};
