// the dialogs with which the end user interacts, to load from and save to Github repositories
const CWRCWriterStorageDialogs = require('cwrc-git-dialogs')['default'];

// the dialogs with which the end user interacts, to lookup entities in public sources:
const CWRCWriterDialogs = require('cwrc-public-entity-dialogs');

// configure the entity lookups a bit:
CWRCWriterDialogs.showNoLinkButton(true);
CWRCWriterDialogs.showCreateNewButton(false);
CWRCWriterDialogs.showEditButton(false);

// the specific source lookups that we pass into the entity lookup dialogs:
const viaf = require('viaf-entity-lookup')
const dbpedia = require('dbpedia-entity-lookup');
const wikidata = require('wikidata-entity-lookup');
const getty = require('getty-entity-lookup');
const geonames = require('geonames-entity-lookup');

// and here we pass those source lookups into the dialogs, setting them in one Map for each entity type:
CWRCWriterDialogs.registerEntitySources({
	person: (new Map()).set('viaf', viaf).set('wikidata', wikidata).set('getty', getty).set('dbpedia', dbpedia),
	place: (new Map()).set('geonames', geonames).set('viaf', viaf).set('dbpedia', dbpedia).set('wikidata', wikidata),
	organization: (new Map()).set('viaf', viaf).set('wikidata', wikidata).set('dbpedia', dbpedia),
	title: (new Map()).set('viaf', viaf).set('wikidata', wikidata).set('dbpedia', dbpedia)
})

// the id of the html element into which to insert the CWRC-Writer:
const container = 'cwrcWriterContainer';

// which CWRCWriter modules to include in the writer UI and how to arrange them in the UI
const modules = {
	west: [ 'structure', 'entities', 'relations' ],
	south: [ 'selection', 'validation' ],
	east: [ 'imageViewer' ]
};

// the url for the CWRC XML validator, to which the CWRC-Writer makes ajax calls to validate the document against the schema
const validationURL = "https://validator.services.cwrc.ca/validator/validate.html"

// the schemas supported, along with their relax ng file, css file for styling, and templates for editing notes and citations
const schemas = {
	"tei": {
		"name": "CWRC Basic TEI Schema",
		"url": "https://cwrc.ca/schemas/cwrc_tei_lite.rng",
		"cssUrl": "https://cwrc.ca/templates/css/tei.css",
		"schemaMappingsId": "tei",
		"entityTemplates": {
			"note": "https://dev-cwrc-writer.cwrc.ca/schema/tei/xml/note.xml",
			"citation": "https://dev-cwrc-writer.cwrc.ca/schema/tei/xml/citation.xml"
		}
	},
	"events": {
		"name": "Events Schema",
		"url": "https://cwrc.ca/schemas/orlando_event_v2.rng",
		"cssUrl": "https://cwrc.ca/templates/css/orlando_v2_cwrc-writer.css",
		"schemaMappingsId": "orlando",
		"entityTemplates": {
			"note": "https://dev-cwrc-writer.cwrc.ca/schema/orlando/xml/note_events.xml",
			"citation": "https://dev-cwrc-writer.cwrc.ca/schema/orlando/xml/citation_events.xml"
		}
	},
	"biography": {
		"name": "Biography Schema",
		"url": "https://cwrc.ca/schemas/orlando_biography_v2.rng",
		"cssUrl": "https://cwrc.ca/templates/css/orlando_v2_cwrc-writer.css",
		"schemaMappingsId": "orlando",
		"entityTemplates": {
			"note": "https://dev-cwrc-writer.cwrc.ca/schema/orlando/xml/note_biography.xml",
			"citation": "https://dev-cwrc-writer.cwrc.ca/schema/orlando/xml/citation_biography.xml"
		}
	},
	"writing": {
		"name": "Writing Schema",
		"url": "https://cwrc.ca/schemas/orlando_writing_v2.rng",
		"cssUrl": "https://cwrc.ca/templates/css/orlando_v2_cwrc-writer.css",
		"schemaMappingsId": "orlando",
		"entityTemplates": {
			"note": "https://dev-cwrc-writer.cwrc.ca/schema/orlando/xml/note_writing.xml",
			"citation": "https://dev-cwrc-writer.cwrc.ca/schema/orlando/xml/citation_writing.xml"
		}
	},
	"cwrcEntry": {
		"name": "CWRC Entry Schema",
		"url": "https://cwrc.ca/schemas/cwrc_entry.rng",
		"cssUrl": "https://cwrc.ca/templates/css/cwrc.css",
		"schemaMappingsId": "cwrcEntry",
		"entityTemplates": {
			"note": "https://dev-cwrc-writer.cwrc.ca/schema/cwrcEntry/xml/note.xml",
			"citation": "https://dev-cwrc-writer.cwrc.ca/schema/cwrcEntry/xml/citation.xml"
		}
	}
}

// finally, set all this in an object that we return.
module.exports = {
    "container": container,
    "modules": modules,
    "entityLookupDialogs": CWRCWriterDialogs,
    "storageDialogs": CWRCWriterStorageDialogs,
    "cwrcRootUrl": "",
    "validationUrl": validationURL,
    "schemas": schemas
};
