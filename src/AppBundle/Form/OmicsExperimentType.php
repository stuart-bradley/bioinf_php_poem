<?php
// src/AppBundle/Form/OmicsExperimentType.php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Valid;
use Doctrine\ORM\EntityRepository;

class OmicsExperimentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('projectName', TextType::class, array('required' => false))
            ->add('projectID', TextType::class, array('required' => false, 'label' => 'Project ID'))
            ->add('requestedDate', DateType::class)
            ->add('description', TextareaType::class, array('required' => false, 'attr' => array('class' => 'summernote')))
            ->add('questions', TextareaType::class, array('required' => false, 'label' => 'Questions to be answered', 'attr' => array('class' => 'summernote')))
            ->add('requestedEndDate', DateType::class)
            ->add('files', CollectionType::class, array(
                'entry_type' => DataFileType::class,
                'allow_add' => true,
                'by_reference' => false,
                'allow_delete' => true,
                'prototype' => true,
                'prototype_name' => '__file_prot__',
                'constraints' => new Valid()))
            ->add('statuses', CollectionType::class, array(
                'entry_type' => StatusType::class,
                'allow_add' => true,
                'by_reference' => false,
                'allow_delete' => true,
                'prototype' => true,
                'prototype_name' => '__status_prot__',
                'constraints' => new Valid()))
            ->add('omicsExperimentTypes', CollectionType::class, array(
                'entry_type' => OmicsExperimentTypeType::class,
                'allow_add' => true,
                'by_reference' => false,
                'allow_delete' => true,
                'prototype' => true,
                'prototype_name' => '__exptype_prot__',
                'constraints' => new Valid()))
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