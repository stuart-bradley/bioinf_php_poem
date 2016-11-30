<?php
// src/AppBundle/Form/SequenceRunType.php
namespace AppBundle\Form;

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Valid;

class SequenceRunType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // Change to EntityType for Users.
            ->add('runBy', TextType::class)
            ->add('startDate', DateType::class, array(
                'data' => new \DateTime(),
            ))
            ->add('endDate', DateType::class, array(
                'data' => new \DateTime(),
            ))
            ->add('kit', TextType::class)
            ->add('materialTypeString', EntityType::class, array(
                'class' => 'AppBundle:MaterialTypeStrings',
                'choice_label' => 'type',
                'label' => 'Material type'))
            ->add('runCoverageTarget', IntegerType::class)
            ->add('readLength', IntegerType::class)
            ->add('samples', CollectionType::class, array(
                'entry_type' => SampleType::class,
                'allow_add' => true,
                'by_reference' => false,
                'allow_delete' => true,
                'prototype' => true,
                'prototype_name' => '__samples_prot__',
                'constraints' => new Valid()))
            ->add('save', SubmitType::class, array('label' => 'Create Sequence Run'))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\SequenceRun',
        ));
    }
}