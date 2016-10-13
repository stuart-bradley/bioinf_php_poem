<?php
// src/AppBundle/Form/OmicsExperimentType.php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class OmicsExperimentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('projectName', TextType::class)
            // Needs to be changed to EntityType when Users are added.
            ->add('requestedBy', TextType::class)
            ->add('requestedDate', DateType::class)
            ->add('description', TextareaType::class)
            ->add('questions', TextareaType::class, array('label' => 'Questions to be answered'))
            ->add('requestedEndDate', DateType::class)
            ->add('omicsExperimentTypes', CollectionType::class, array('entry_type' => \AppBundle\Entity\OmicsExperimentType::class))
            ->add('save', SubmitType::class, array('label' => 'Create Experiment'))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\OmicsExperiment',
        ));
    }
}