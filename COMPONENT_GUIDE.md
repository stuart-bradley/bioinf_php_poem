## POEM Component Guide 

This document is intended to be used to help come to grips with the POEM system from a development perspective. It is 
organised in the same layout as the file structure.

### Index

- [app](#app)
  - [config](#config)
  - [Resources](#resources) 
- [AppBundle](#appbundle)
  - [BioControl](#biocontrol)
  - [Command](#command)
  - [Controller](#controller)
  - [DataFixtures](#datafixtures)
    - [Data](#data)
    - [Real](#real)
    - [Test](#test)
  - [Entity](#entity)
  - [EventListener](#eventlistener)
  - [Form](#form)
  - [Repository](#repository)
  - [Resources](#resources)
  - [Twig](#twig)
  - [Uploader](#uploader)
  - [UserManager](#usermanager)
  - [Version Manager](#versionmanager) 
- [tests](#tests)
  - [Controller](#controller)
  
## app

Inside the main `app` directory is `AppKernal.php`, which must be modified if adding new bundles by extending the 
`registerBundles` internal array. 

### config

- `config.yml` contains a huge amount of configuration information for all the services and bundles inside the application.
The `config_*.yml` files contain overriding information for different environments. When adding new CSS or JS files, the Assetic 
config must be modified in this file to include them.
- `parameters.yml` is a `.gitignore` file that contains sensitive information for the operation of POEM. `parameters.yml.dist` 
provides a composer template. 
- `security.yml` contains the config for the security portion of POEM. This includes defining access roles as well as 
access control for various urls in POEM. 
- `services.yml` registers custom services (such as the [file uploader](#uploader) and [version manager](#version-manager)), and gives them various other 
container components. If custom classes are created, they should often be registered in this way for use throughout POEM. 

### Resources

The resources folder contains all the `Twig` views for POEM. The `FOSUserBundle` has its own section, which can be modified 
for custom security views.

For POEM, views are broken down into its two main components, OmicsExperiment and SequenceRun. Both components have the 
same views. There are two sections which require additional explanation:
- `/datatables` is a folder containing custom rendering for individual cells of the datatable. Inside the respective 
controller, there is a `datatable` function which defines which file is used for which field. These templates are passed 
two parameters: `dt_item` is the value of the field defined by the function, and `dt_object` is the entire entity of that 
datatable row. 
- `*_subfields.html.twig` is a file containing the prototype templates used for the nested forms. These are used when items 
are added dynamically to the form. 

## AppBundle

### BioControl

The `BioControlManager` class is used to convert JSON data from the OmicsExperiment Sample form, into Microsoft SQL 
queries which interface with the BioControl server, and then converting the results back into JSON for use in the frontend.

There is an additional method (`getBioControlSampleNonJSON`) which can be used to interact with the server while avoiding 
the JSON overhead.   

### Command

`CreateUsersCommand` and `UpdateUserDnCommand` define console commands for use when interacting with the LDAP server. 
They have been defined in the main ReadMe, and are there so that changes to the LDAP server (say DN changes) can be 
quickly propagated to POEM.   

### Controller

The controllers in POEM are broken down in the OmicsExperiment/SequenceRun controllers, and the BioControl controller. 

All controllers use the annotation notation for routing. 

The OmicsExperiment and SequenceRun controllers have the same methods: Index (which uses the GridAction), New, Show, 
Edit, and Delete. The only notable behavioural change is that the entities have to be persisted and flushed twice: once 
for associations to form, and a second time for versioning to occur. OmicsExperiment also has an `ExportAction` which is 
used to produce CSV output of the entity.  

The BioControl controller is an AJAX action for interfacing with the [`BioControlManager`](#biocontrol).

### DataFixtures

Fixtures are used in POEM both for testing, and for initialising the production and development databases.

For development and production enviroments, initial loading is as follows:

```
sudo php bin/console doctrine:fixtures:load --fixtures=src/AppBundle/DataFixtures/ORM/Real --fixtures=src/AppBundle/DataFixtures/ORM/Data
```

#### Data

The data fixture is for loading preexisting Omics Experiments from their old Excel format into the system. It should be 
run every time the database is created. It uses the `LoadExcelData` class, which is fairly sensitive to the excel 
structure and would need to be modified should that change. 

Additionally, the class requires the following two parameters: `excel_data_path`, and `excel_data_worksheet`.

#### Real

This set of fixtures is for loading users from the LDAP server, the strings for StatusStrings and MaterialTypeStrings, 
and also the relationships between OmicsExperimentType and OmicsExperimentSubType. These are all required for operation 
of POEM, and this folder must be loaded into the database for it work.  

#### Test

This set of fixtures loads some very simple data into the database for testing. It is used by the testing suite, and can 
also be loaded seperately for adhoc inspections and testing. 

### Entity

These files define the entity structures for database objects via Doctrine. They use the annotation notation, and changes 
to them can be propagated using the following console command:

```
sudo php bin/console doctrine:schema:update --force
```

The EER diagram for all entities is as follows:

![EER](screenshots/eer.png)

### EventListener

The `EntityListener` class is used to watch for changes to Doctrine entities, more specifically, it watches for changes 
involving the File entity, and calls the [`FileUploader`](#uploader) methods as needed.

This could have been directly inside the entities themselves, but it is better practice and cleaner to move the listener 
to a separate file. 

### Form

The form folder contains `FormBuilder` classes for individual forms. These define the fields for an entity which are 
available for a from end Twig view. Each form field has a datatype associated with it, and also includes information on 
various Symfony and HTML field options. 

Additionally, when nesting forms, the `CollectionType` field is defined here so let Symfony know a form has a sub form 
(which is defined in it's own `FormBuilder` class). 

### Repository

These classes hold custom Doctrine queries for individual entities. For example, if you wanted a specific sample of an 
OmicsExperiment, the method would be placed here (and it is). These methods focus primarily on Doctrine and it's methods, 
and more information on creating them can be found in the Doctrine documentation. 

### Resources

The resources folder holds all the CSS/JS/etc for the project. The JS folder will be covered here, as lots of custom JS 
is used throughout POEM:
- `bio_control_sample_updater.js` - Handles the AJAX call and form filling for the Sample form and it's interaction with 
BioControl. It also has reset methods for failed calls so the form doesn't mess up if a sampleID isn't found.
- `exp_sub_type_selection_updater.js` - When a OmicsExperimentType is selected, there are different options for 
OmicsExperimentSubTypes. This file updates the select inputs accordingly. It gets the relationship information directly 
from the controller (which in turn uses a Repository method to build this information dynamically). Any changes made to 
these relationships in the Real fixtures is automatically propagated. 
- `form_collection.js` - This is the workhorse of the nested form system for POEM. It is reasonably robust, assuming the 
HTML layout for subforms follows a particular pattern and naming scheme (see the [cookbook](COOKBOOK.md) for more info). 
- `sample_id_updater.js` - Inside the OmicsExperiment form, Sample number and IDs are tracked for usability. This file 
tracks field and form changes to keep this information dynamically up to date. 
- `set_nav_active_link.js` - This is a file written by another developer which handles redirection correctly for certain 
buttons.
- `summernote_config.js` - This is the configuration for the textbox inputs. Essentially it removes the inline ability 
to upload images and videos, because this does not use the underlying file uploader, and causes unnecessary hassle.   

To run these JS files on specific pages, they should be called in the `{% block javascipt %}` section of the Twig 
template. For example, here is the block for the Omics Experiment Twig view:
```
{% block javascripts %}
    {{ parent() }}
    <script type="text/javascript">
        new FormCollections(['files', 'statuses', 'omics_experiment_types', 'omics_experiment_sub_types', 'samples']);
        new ExpSubTypeSelectionUpdater({{ select_relations|json_encode()|raw }});
        new BioControlSampleUpdater();
        new SampleIdUpdater();
    </script>
{% endblock %}
```

### Twig

The Twig folder holds custom Twig extensions for use in Twig templates in the format `{{ value | custom_extension}}`. In 
the case of POEM, the versions are fed into a custom extension and pretty printed for usability.  

### Uploader

The `FileUploader` class is a very basic standard class for handling the high level file IO of file uploading. 

### UserManager 

The `UserManager` class is a service that interacts with an LDAP server to find and create users for POEM. All attempts 
have been made to make sure it's fairly robust to changes to the external server, but it does assume the following 
fields exist for a user: `['samaccountname', 'dn', 'memberof', 'cn']`. Removal of any of these would require changes for 
POEM to function. 

### Version Manager 

The `VersionManager` service was created to deal with an absence of solutions for versioning nested entities. The 
standard Symfony suggestion required essentially duplicating every table to version. Instead, one Version table is 
created and array entity hydration and change sets are created by this class and stored.

When adding fields to an entity that you wish to be versioned, a line must be added to `*CreateHydration` to include 
it in the array hydration for versioning. Doctrine has it's own methods for array hydration, but they weren't flexible 
enough to use wholesale, so the decision was made to handcraft hydrations. 

## tests

The tests in POEM are high level functional tests which cover general user stories. It was always intended that a full 
suite be produced, but due to the development timeframes, this was never possible.

One glaring issue is the lack of a JS testing framework for the frontend, which should be added as soon as possible.

Unit testing of custom services would also be ideal, and a great way to understand their function.   

### Controller

The tests in this folder cover all the controllers and their individual methods. There is a test for each action in the 
controller, which tests the HTML requests and responses. This does not adequately cover the actual frontend, and 
extensions are needed.

All tests use the [Test](#test) fixtures, and build entity objects out of simple arrays to reduce complexity. 