<?php
// src/AppBundle/Form/SampleType.php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Doctrine\ORM\EntityRepository;

class SampleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('BCSampleID', IntegerType::class, array(
                'label' => 'BioControl sample ID', 'required' => false))
            ->add('BCRunID', IntegerType::class, array(
                'label' => 'BioControl run ID', 'required' => false))
            ->add('BCExperimentID', IntegerType::class, array(
                'label' => 'BioControl experiment ID', 'required' => false))
            ->add('sampledDateTime', DateTimeType::class, array(
                'label' => 'Sample date and time',
                'data' => new \DateTime()))
            ->add('sampledBy', EntityType::class, array(
                'class' => 'AppBundle:FOSUser',
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('u')
                        ->orderBy('u.cn', 'ASC');
                },
                'choice_label' => 'cn'
            ))
            ->add('RNALaterTreated',CheckboxType::class,array(
                'label' => 'Treated?',
                'required' => false))
            ->add('materialTypeString', EntityType::class, array(
                'class' => 'AppBundle:MaterialTypeStrings',
                'choice_label' => 'type'))
        ;

        // Event listener to remove placeholder current date when editing a Status.
        $builder->addEventListener(FormEvents::PRE_SET_DATA, function(FormEvent $event) {
            $sample = $event->getData();
            $form = $event->getForm();

            if (!$sample) {
                return;
            }

            if ($date = $sample->getSampledDateTime()) {
                $form->add('sampledDateTime', DateTimeType::class, array(
                    'data' => $date,
                ));
            }
        });
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Sample',
        ));
    }
}