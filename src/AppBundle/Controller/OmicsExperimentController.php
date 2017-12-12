<?php
// src/AppBundle/Controller/OmicsExperimentController.php
namespace AppBundle\Controller;

use AppBundle\Entity\OmicsExperiment;
use AppBundle\Entity\Version;
use AppBundle\Form\OmicsExperimentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class OmicsExperimentController extends Controller
{

    /**
     * Grid action
     * @Route("/omics_experiment/datatable", name="omics_experiment_datatable")
     * @return Response
     */
    public function gridAction()
    {
        return $this->datatable()->execute();
    }

    /**
     * @Route("/omics_experiment/index", name="omics_experiment_index")
     */
    public function indexAction()
    {
        $this->datatable();
        return $this->render('omics_experiment/index.html.twig');
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
            $omics_experiment->addUser($user);
            // Persist twice to first generate associations, and then generate version.
            $em->persist($omics_experiment);
            $em->flush();
            $this->get('app.version_manager')->createVersion($omics_experiment);
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

        $omics_experiment->getVersions();

        $versions_repository = $this->getDoctrine()->getRepository('AppBundle:Version');
        $versions = $versions_repository->findBy(array('omicsExperiment' => $omics_experiment));

        return $this->render('omics_experiment/show.html.twig', array('omics_experiment' => $omics_experiment, 'versions' => $versions));
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
            $omics_experiment->setUpdatedAt(new \DateTime());
            // Persist twice to first generate associations, and then generate version.
            $em->persist($omics_experiment);
            $em->flush();
            $this->get('app.version_manager')->createVersion($omics_experiment);
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

    /**
     * set datatable configs
     * @return \Waldo\DatatableBundle\Util\Datatable
     */
    private function datatable()
    {
        return $this->get('datatable')
            ->setEntity("AppBundle:OmicsExperiment", "x")
            ->setFields(
            // Render replaces ID with required field
                array(
                    "ID" => 'x.id',
                    "Date" => 'x.requestedDate',
                    "Author" => 'x.id',
                    "Title" => 'x.projectName',
                    "Description" => 'x.description',
                    "Statuses" => 'x.id',
                    "" => "x.id",
                    "_identifier_" => 'x.id')
            )
            ->setOrder("x.id", "DESC")
            // users join not required as it's done inside renderer.
            ->setRenderers(
                array(
                    1 => array(
                        'view' => 'omics_experiment/datatables/_omics_experiment_dates.html.twig'
                    ),
                    2 => array(
                        'view' => 'omics_experiment/datatables/_omics_experiment_users.html.twig'
                    ),
                    4 => array(
                        'view' => 'omics_experiment/datatables/_omics_experiment_description.html.twig'
                    ),
                    5 => array(
                        'view' => 'omics_experiment/datatables/_omics_experiment_statuses.html.twig'
                    ),
                    6 => array(
                        'view' => 'omics_experiment/datatables/_omics_experiment_buttons.html.twig'
                    ),
                )
            )
            ->setGlobalSearch(true);
    }
}