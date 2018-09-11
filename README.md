![Picture](http://cwrc.ca/logos/CWRC_logos_2016_versions/CWRCLogo-Horz-FullColour.png)

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

See [CWRC-GitWriter](https://github.com/cwrc/CWRC-GitWriter) for documentation about the GitWriter itself.

This repository exists as a means to build a distributable version of the CWRC-Writer that can be included into the script tag of an html page like so:

```
<html>
    <body>
        <div id="cwrcWriterContainer" style="height: 100%; width: 100%;"></div>
        <script type="text/javascript" src="js/cwrcwriter.js"></script>
        <script type="text/javascript" src="js/yourAppThatUsesTheCWRCWRiter.js"></script>
    </body>
</html>
``` 

where cwrcwriter.js contains the distributable CWRCWriter, and yourAppThatUsesTheCWRCWRiter.js (or whatever you want to call your file or files) contains your code.

The cwrc.js file will, when loaded in the script tag (as above), expose a constructor in global (window) scope:

`window.CWRCWriter`

Your code (in yourAppThatUsesTheCWRCWRiter.js) could then create a CWRCWriter like so:

```javascript
var writer = new CWRCWriter(config)
````

where the config file is described below in [Config](#config).

The constructor will instantiate a CWRCWriter and return it, and also add the HTML code for the editor into the DOM element whose id you list in the config (so you'll also have to include that element in the html page, like we did with the div above):

`config.container = 'cwrcWriterContainer'`

You can then use the 'writerInitialized' event to do whatever needs doing after the CWRCWriter has finished initializing, like say loading a document:
 
```javascript
writer.event('writerInitialized').subscribe(function() {
    writer.setDocument(documentAsStringOrParsedXMLDocument)
});
```

When you want to get the document out of the CWRC-Writer (say to save it):

`writer.getDocument()` which will return the string version of the document.

### Config

The CWRC-Writer is configured by passing in a config object to the constructor.   A sample config object is included in the [config.js file](/js/config.js)

Some of the options that can be configured are:

##### Required Options

* `config.container`: String. The ID of the HTML element into which to inject the CWRC-Writer.
* `config.storageDialogs`: Object. Storage dialogs, see [cwrc-git-dialogs](https://github.com/cwrc/cwrc-git-dialogs) for example and API definition.
* `config.entityLookupDialogs`: Object. Entity lookup, see [cwrc-public-entity-dialogs](https://github.com/cwrc/CWRC-PublicEntityDialogs) for example and API definition.

##### Other Options

* `config.cwrcRootUrl`: String. An absolute URL that should point to the root of the CWRC-Writer directory. If blank, the browser URL will be used.
* `config.modules`: Object. The IDs of the [modules](#modules) to load, grouped by their locations relative to the CWRC-Writer.
  
  For example:
  ```
  config.modules = {
    west: ['structure','entities'],
    east: ['selection'],
    south: ['validation']
  }
  ```
* `config.annotator`: Boolean. If true, the end user may only add annotations to the document.
* `config.readonly`: Boolean. If true, the end user may not edit nor annotate the document.
* `config.mode`: String. The mode in which to start the CWRC-Writer.  `xml` or `xmlrdf`.
* `config.allowOverlap`: Boolean. Should overlapping entities be allowed initially?
* `config.validationUrl`: String. The URL to use for XML validation. If blank, will default to the validation service provided by CWRC.
* `config.schemas`: Object. A map of schema objects that can be used in the CWRC-Writer. Each entry should contain the following:
  * `name`: String. The schema title.
  * `url`: String. An URL that links to the schema (RELAX NG) file.
  * `cssUrl`: String. An URL that links to the CSS associated with this schema.
  * `schemaMappingsId`: String. The directory name in the [schema directory](src/js/schema) from which to load mapping and dialogs files for the schema.
  * `entityTemplates`: Object. Lists URLs for use by citation and note entity dialogs.
* `config.buttons1`, `config.buttons2`, `config.buttons3`: String. A comma separated list of plugins to set in the CWRC-Writer toolbars. Possible values: `addperson, addplace, adddate, addorg, addcitation, addnote, addtitle, addcorrection, addkeyword, addlink, editTag, removeTag, addtriple, viewsource, editsource, validate, savebutton, loadbutton`.
