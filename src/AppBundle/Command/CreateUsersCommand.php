<?php
// src/AppBundle/Command/CreateUsersCommand.php
namespace AppBundle\Command;

use AppBundle\Entity\FOSUser;
use Composer\Installer\PackageEvent;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

/**
 * Class CreateUsersCommand - Creates users from the LDAP server.
 * @package AppBundle\Command
 */
class CreateUsersCommand extends ContainerAwareCommand
{
    /**
     * Defines the command and argument structure for creating FOSUsers.
     */
    protected function configure()
    {
        $this->setName('poem:user:create')
            ->addArgument(
                'usernames',
                InputArgument::IS_ARRAY | InputArgument::REQUIRED,
                'samaccountnames of users to create.'
            );
    }

    /**
     * Calls the UserManager to create FOSUsers. If a user already exists, it still returns successful.
     * @param InputInterface $input
     * @param OutputInterface $output
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $userManager = $this->getContainer()->get('app.user_manager');
        foreach ($input->getArgument('usernames') as $username) {
            $user = $userManager->findOrCreateUser($username);
            if ($user) {
                $output->writeln($username . " created successfully.");
            } else {
                $output->writeln($username . " not created.");
            }
        }
    }
}