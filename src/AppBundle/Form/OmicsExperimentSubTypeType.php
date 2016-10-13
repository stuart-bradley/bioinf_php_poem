<?php
// src/AppBundle/Form/OmicsExperimentSubTypeType.php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class OmicsExperimentSubTypeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('omicsExperimentSubTypeString', EntityType::class, array('class' => 'AppBundle:OmicsExperimentSubTypeStrings','choice_label' => 'type'))
            ->add('samples', CollectionType::class, array('entry_type' => \AppBundle\Entity\Sample::class))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\OmicsExperimentType',
        ));
    }
}