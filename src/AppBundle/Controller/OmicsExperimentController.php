<?php
// src/AppBundle/Controller/OmicsExperimentController.php
namespace AppBundle\Controller;

use AppBundle\Entity\OmicsExperiment;
use AppBundle\Form\OmicsExperimentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class OmicsExperimentController extends Controller
{
    /**
     * @Route("/omics_experiment/index", name="omics_experiment_index")
     */
    public function indexAction()
    {
        // Grab all experiments from database and hand them to template.
        $repository = $this->getDoctrine()->getRepository('AppBundle:OmicsExperiment');
        $omics_experiments = $repository->findAll();
        return $this->render('omics_experiment/index.html.twig', ['omics_experiments' => $omics_experiments]);
    }

    /**
     * @Route("/omics_experiment/new", name="omics_experiment_new")
     */
    public function newAction(Request $request)
    {
        $omics_experiment = new OmicsExperiment();

        $em = $this->getDoctrine()->getManager();
        $exp_type_relations = $em->getRepository('AppBundle:OmicsExperimentTypeStrings')->getExpTypeSubTypeRelations();

        $form = $this->createForm(OmicsExperimentType::class, $omics_experiment);

        $form->handleRequest($request);
        // On submission.
        if ($form->isSubmitted() && $form->isValid()) {
            $user = $this->get('security.token_storage')->getToken()->getUser();
            $omics_experiment->setRequestedBy($user);
            $em->persist($omics_experiment);

            $em->flush();
            return $this->redirectToRoute('omics_experiment_index');
        }

        return $this->render('omics_experiment/form.html.twig', array('form' => $form->createView(), 'select_relations' => $exp_type_relations, 'edit' => False));
    }

    /**
     * @Route("/omics_experiment/show/{id}", name="omics_experiment_show")
     */
    public function showAction($id)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:OmicsExperiment');
        $omics_experiment = $repository->find($id);

        return $this->render('omics_experiment/show.html.twig', array('omics_experiment' => $omics_experiment));
    }

    /**
     * @Route("/omics_experiment/edit/{id}", name="omics_experiment_edit")
     */
    public function editAction(Request $request, $id)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:OmicsExperiment');
        $omics_experiment = $repository->find($id);

        $em = $this->getDoctrine()->getManager();
        $exp_type_relations = $em->getRepository('AppBundle:OmicsExperimentTypeStrings')->getExpTypeSubTypeRelations();

        $form = $this->createForm(OmicsExperimentType::class, $omics_experiment);

        $form->handleRequest($request);
        // On submission.
        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($omics_experiment);
            $em->flush();
            return $this->redirectToRoute('omics_experiment_index');
        }

        return $this->render('omics_experiment/form.html.twig', array('form' => $form->createView(), 'select_relations' => $exp_type_relations, 'edit' => True));
    }

    /**
     * @Route("omics_experiment/delete/{id}", name="omics_experiment_delete")
     */
    public function deleteAction(Request $request, $id)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:OmicsExperiment');
        $omics_experiment = $repository->find($id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($omics_experiment);
        $em->flush();

        $this->addFlash(
            'notice',
            '"' . $omics_experiment->getProjectName() . '" has successfully been deleted.'
        );

        return $this->redirectToRoute('omics_experiment_index');
    }

    /**
     * @Route("/omics_experiment/export/{id}", name="omics_experiment_export")
     */
    public function exportAction(Request $request, $id)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:OmicsExperiment');
        $omics_experiment = $repository->find($id);

        $em = $this->getDoctrine()->getManager();
        $fields = ['sample.BCSampleID', 'omics.projectName', 'expstr.type AS exptype', 'expsubstr.type AS expsubtype'];
        $fileContent = $em->getRepository('AppBundle:OmicsExperiment')->getExport($id, $fields);
        $response = new Response($fileContent);

        $disposition = $response->headers->makeDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            $omics_experiment->getProjectName() . '.csv'
        );

        $response->headers->set('Content-Disposition', $disposition);
        $response->send();

        return new Response();
    }
}