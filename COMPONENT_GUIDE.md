## POEM Component Guide 

This document is intended to be used to help come to grips with the POEM system from a development perspective. It is 
organised in the same layout as the file structure.

### Index

- [app](#app)
  - [config](#config)
  - [Resources](#Resources) 
- [src/AppBundle](#src/AppBundle)
  - BioControl
  - Command
  - Controller
  - DataFixtures
  - Entity
  - EventListener
  - Form
  - Repository
  - Resources
  - Twig
  - Uploader
  - UserManager 
  - Version Manager 
- [tests/AppBundle](#tests/AppBundle)
  - Controller
  
## app

Inside the main `app` directory is `AppKernal.php`, which must be modified if adding new bundles by extending the 
`registerBundles` internal array. 

### config

- `config.yml` contains a huge amount of configuration information for all the services and bundles inside the application.
The `config_*.yml` contain overriding information for different environments. When adding new CSS or JS files, the Assetic 
config must be modified in this file to include them.
- `parameters.yml` is a `.gitignore` file that contains sensitive information for the operation of POEM. `parameters.yml.dist` 
provides a composer template. 
- `security.yml` contains the config for the security portion of POEM. This includes defining access roles as well as 
access control for various urls in POEM. 
- `services.yml` registers custom services (such as the file uploader and version manager), and gives them various other 
container components. If custom classes are created, they should often be registered in this way for use throughout POEM. 

### Resources

The resources folder contains all the `Twig` views for POEM. The `FOSUserBundle` has its own section, which can be modified 
for custom security views.

For POEM, views are broken down into its two main components, OmicsExperiment and SequenceRun. Both components have the 
same views, 

## src/AppBundle

## tests/AppBundle