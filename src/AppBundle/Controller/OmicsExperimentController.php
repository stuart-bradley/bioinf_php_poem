<?php
// src/AppBundle/Controller/OmicsExperimentController.php
namespace AppBundle\Controller;

use AppBundle\Entity\OmicsExperiment;
use AppBundle\Entity\Status;
use AppBundle\Form\OmicsExperimentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Doctrine\Common\Collections\ArrayCollection;

// TODO: deleteAction should be implemented.

class OmicsExperimentController extends Controller {
    /**
     * @Route("/omics_experiment/index", name="omics_experiment_index")
     */
    public function indexAction() {
        // Grab all experiments from database and hand them to template.
        $repository = $this->getDoctrine()->getRepository('AppBundle:OmicsExperiment');
        $omics_experiments = $repository->findAll();
        return $this->render('omics_experiment/index.html.twig',['omics_experiments' => $omics_experiments]);
    }

    /**
     * @Route("/omics_experiment/new", name="omics_experiment_new")
     */
    public function newAction(Request $request) {
        $omics_experiment = new OmicsExperiment();

        $em = $this->getDoctrine()->getManager();
        $exp_type_relations = $em->getRepository('AppBundle:OmicsExperimentTypeStrings')->getExpTypeSubTypeRelations();

        $form = $this->createForm(OmicsExperimentType::class, $omics_experiment);

        $form->handleRequest($request);

        // On submission.
        if ($form->isValid()) {
            $em->persist($omics_experiment);
            $em->flush();
            return $this->redirectToRoute('omics_experiment_index');
        }

        return $this->render('omics_experiment/form.html.twig', array('form' => $form->createView(), 'select_relations' =>  $exp_type_relations));
    }

    /**
     * @Route("/omics_experiment/show/{id}", name="omics_experiment_show")
     * TODO: Not sure if nessesary (wasn't in last system).
     */
    public function showAction($id) {
        return $this->render('omics_experiment/show.html.twig');
    }

    /**
     * @Route("/omics_experiment/edit/{id}", name="omics_experiment_edit")
     */
    public function editAction(Request $request, $id) {
        $repository = $this->getDoctrine()->getRepository('AppBundle:OmicsExperiment');
        $omics_experiment = $repository->find($id);

        $em = $this->getDoctrine()->getManager();
        $exp_type_relations = $em->getRepository('AppBundle:OmicsExperimentTypeStrings')->getExpTypeSubTypeRelations();

        $form = $this->createForm(OmicsExperimentType::class, $omics_experiment);

        $form->handleRequest($request);

        // On submission.
        if ($form->isValid()) {
            $em->persist($omics_experiment);
            $em->flush();
            return $this->redirectToRoute('omics_experiment_index');
        }

        return $this->render('omics_experiment/form.html.twig', array('form' => $form->createView(), 'select_relations' =>  $exp_type_relations));
    }

}