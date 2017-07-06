<?php
// src/AppBundle/Command/UpdateUserDnCommandCommand.php
namespace AppBundle\Command;

use AppBundle\Entity\FOSUser;
use Composer\Installer\PackageEvent;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class UpdateUserDnCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this->setName('user:updateDn')
            ->addArgument(
                'usernames',
                InputArgument::IS_ARRAY | InputArgument::OPTIONAL,
                'samaccountnames of users to reset DNs.'
            )
            ->addOption(
                'all',
                null,
                InputOption::VALUE_NONE,
                'Set DN of all FOSUsers in database.'
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $userManager = $this->getContainer()->get('app.user_manager');
        $users = [];
        if ($input->getOption('all')) {
            $users = $this->getContainer()->get('doctrine')->getEntityManager()
                ->getRepository('AppBundle:FOSUser')->findAll();
        } else {
            foreach ($input->getArgument('usernames') as $username) {
                $user = $this->getContainer()->get('doctrine')->getEntityManager()
                    ->getRepository('AppBundle:FOSUser')
                    ->findOneBy(array('username' => $username));
                if ($user) {
                    $users[] = $user;
                } else {
                    $output->writeln($username . " not found in database.");
                }
            }
        }
        $result = $userManager->updateUsersDn($users);
        $output->writeln($result);
    }
}