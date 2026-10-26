<?php

use BDynamic\Plinth\Enums\Glyph;

/*
| Plinth's components, as the site lists them: each has a page from its Markdown in
| site/components, a card on the components page, and, where it has variants, sizes or states, a
| playground. The playground's template is Blade, rendered live and printed in every layer
| (App\Components\Playground). `css` names its stylesheet when that isn't the component's own
| name.
*/

$variants = ['primary', 'accent', 'secondary', 'ghost', 'danger', 'danger-ghost'];
$controls = ['values' => ['sm', 'md', 'lg'], 'default' => 'md'];

return [

    'path' => base_path('components'),

    'groups' => ['Actions', 'Forms', 'Content', 'Navigation', 'Layout', 'Overlays'],

    'components' => [

        'button' => [
            'name' => 'Button',
            'group' => 'Actions',
            'description' => 'Does something: saves, submits, opens a sheet. Six variants, three sizes.',
            'playground' => [
                'template' => '<x-plinth::button{attributes}>{label}</x-plinth::button>',
                'options' => [
                    'variant' => [
                        'values' => $variants,
                        'default' => 'primary',
                        'content' => [
                            'primary' => ['{label}' => 'Save changes'],
                            'accent' => ['{label}' => 'Start free trial'],
                            'secondary' => ['{label}' => 'Cancel'],
                            'ghost' => ['{label}' => 'Skip'],
                            'danger' => ['{label}' => 'Delete project'],
                            'danger-ghost' => ['{label}' => 'Remove'],
                        ],
                    ],
                    'size' => $controls,
                ],
                'states' => ['busy', 'disabled'],
            ],
        ],

        'icon-button' => [
            'name' => 'Icon button',
            'group' => 'Actions',
            'description' => 'A button with only an icon, for toolbars, headers and closing a sheet.',
            'css' => 'button',
            'playground' => [
                'template' => '<x-plinth::icon-button label="Search" icon="search"{attributes} />',
                'options' => [
                    'variant' => ['values' => $variants, 'default' => 'ghost'],
                    'size' => $controls,
                ],
                'states' => ['pressed', 'busy', 'disabled'],
            ],
        ],

        'field' => [
            'name' => 'Field',
            'group' => 'Forms',
            'description' => 'A label, a description and an error around any control, or a fieldset around a group.',
            'playground' => [
                'template' => "<x-plinth::field id=\"playground-status\" label=\"Status\" group description=\"Pick at least one state.\"{attributes}>\n    <x-plinth::pill-row aria-labelledby=\"playground-status-label\">\n        <x-plinth::pill selected>Open</x-plinth::pill>\n        <x-plinth::pill>Pending</x-plinth::pill>\n        <x-plinth::pill>Closed</x-plinth::pill>\n    </x-plinth::pill-row>\n</x-plinth::field>",
                'options' => [
                    'error' => [
                        'values' => ['none', 'shown'],
                        'default' => 'none',
                        'print' => ['shown' => 'error="Pick a state to show tickets in."'],
                    ],
                ],
                'states' => ['required', 'hide-label', 'disabled'],
            ],
        ],

        'text-field' => [
            'name' => 'Text field',
            'group' => 'Forms',
            'description' => 'One line of text with its label, a description and an error; search with a clear button.',
            'playground' => [
                'template' => '<x-plinth::text-field label="Email" type="email" placeholder="name@example.com" description="Receipts go to this address."{attributes} />',
                'options' => [
                    'size' => ['values' => ['sm', 'md'], 'default' => 'md'],
                    'error' => [
                        'values' => ['none', 'shown'],
                        'default' => 'none',
                        'print' => ['shown' => 'error="Enter an email address, such as name@example.com."'],
                    ],
                ],
                'states' => ['hide-label', 'disabled', 'readonly'],
            ],
        ],

        'one-time-code' => [
            'name' => 'One-time code',
            'group' => 'Forms',
            'description' => 'A code from an authenticator app or a text message, as one input in digit cells.',
            'playground' => [
                'template' => '<x-plinth::one-time-code label="Verification code" description="Enter the code from your authenticator app."{attributes} />',
                'options' => [
                    'length' => ['values' => ['4', '5', '6', '7', '8'], 'default' => '6'],
                    'error' => [
                        'values' => ['none', 'shown'],
                        'default' => 'none',
                        'print' => ['shown' => 'error="That code didn\'t work. Enter the newest one."'],
                    ],
                ],
                'states' => ['hide-label', 'disabled'],
            ],
        ],

        'textarea' => [
            'name' => 'Textarea',
            'group' => 'Forms',
            'description' => 'Several lines of text, with the same label, description and error; it can grow with its content.',
            'playground' => [
                'template' => '<x-plinth::textarea label="Reply" placeholder="Write a reply" description="The customer sees this reply."{attributes} />',
                'options' => [
                    'error' => [
                        'values' => ['none', 'shown'],
                        'default' => 'none',
                        'print' => ['shown' => 'error="Write a reply before you send it."'],
                    ],
                ],
                'states' => ['grow', 'hide-label', 'disabled', 'readonly'],
            ],
        ],

        'avatar' => [
            'name' => 'Avatar',
            'group' => 'Content',
            'description' => 'A person or an organisation at a glance: image, then initials, then a glyph.',
            'playground' => [
                'template' => '<x-plinth::avatar name="Ana Lima"{attributes} />',
                'options' => [
                    'size' => ['values' => ['sm', 'md', 'lg', 'xl'], 'default' => 'md'],
                    'status' => [
                        'values' => ['none', 'success', 'warning', 'danger'],
                        'default' => 'none',
                        'print' => [
                            'success' => 'status="success" status-label="Online"',
                            'warning' => 'status="warning" status-label="Away"',
                            'danger' => 'status="danger" status-label="Busy"',
                        ],
                    ],
                ],
            ],
        ],

        'badge' => [
            'name' => 'Badge',
            'group' => 'Content',
            'description' => 'A short label for the status of something, next to what it describes.',
            'playground' => [
                'template' => '<x-plinth::badge{attributes}>{label}</x-plinth::badge>',
                'options' => [
                    'tone' => [
                        'values' => ['neutral', 'success', 'warning', 'danger'],
                        'default' => 'neutral',
                        'content' => [
                            'neutral' => ['{label}' => 'Draft'],
                            'success' => ['{label}' => 'Paid'],
                            'warning' => ['{label}' => 'Due soon'],
                            'danger' => ['{label}' => 'Overdue'],
                        ],
                    ],
                ],
                'states' => ['dot'],
            ],
        ],

        'callout' => [
            'name' => 'Callout',
            'group' => 'Content',
            'description' => 'A short message set apart from the page: a note, a tip, a warning.',
            'playground' => [
                'template' => '<x-plinth::callout{attributes} title="{title}">{text}</x-plinth::callout>',
                'options' => [
                    'tone' => [
                        'values' => ['neutral', 'info', 'success', 'warning', 'danger'],
                        'default' => 'neutral',
                        'content' => [
                            'neutral' => ['{title}' => 'Drafts are private', '{text}' => 'Only you can see an invoice until you send it.'],
                            'info' => ['{title}' => 'Invoices are sent at 9:00', '{text}' => 'Anything you schedule today goes out tomorrow morning.'],
                            'success' => ['{title}' => 'Invoice sent', '{text}' => 'The client gets a copy by email.'],
                            'warning' => ['{title}' => 'Your trial ends in 3 days', '{text}' => 'Pick a plan to keep your projects.'],
                            'danger' => ['{title}' => 'The export failed', '{text}' => 'Nothing was changed. Try again in a minute.'],
                        ],
                    ],
                ],
            ],
        ],

        'code-block' => [
            'name' => 'Code block',
            'group' => 'Content',
            'description' => 'Code to read and copy, with a label or tabs, highlighted on the server.',
        ],

        'data-table' => [
            'name' => 'Data table',
            'group' => 'Content',
            'description' => 'Records as cards on a phone and a table from 768px, from one markup, with no script.',
        ],

        'empty-state' => [
            'name' => 'Empty state',
            'group' => 'Content',
            'description' => 'A calm, centred message for nothing to show yet, often with one action.',
            'playground' => [
                'template' => "<x-plinth::empty-state heading=\"No runs yet\" heading-level=\"h3\" description=\"Runs show here once a workflow starts.\"{attributes}>\n    <x-slot:icon>\n        <x-plinth::icon><x-site.glyph name=\"inbox\" /></x-plinth::icon>\n    </x-slot:icon>\n    <x-slot:actions>\n        <x-plinth::button href=\"#\">Start a run</x-plinth::button>\n    </x-slot:actions>\n</x-plinth::empty-state>",
                'states' => ['framed'],
            ],
        ],

        'icon' => [
            'name' => 'Icon',
            'group' => 'Content',
            'description' => 'A built-in interface glyph by name, or a project\'s own SVG, sized and coloured by Plinth.',
            'playground' => [
                'template' => '<x-plinth::icon{attributes} />',
                'options' => [
                    // The default glyph is printed too: without a name the icon would be empty.
                    'name' => ['values' => Glyph::values(), 'default' => 'menu', 'print' => ['menu' => 'name="menu"']],
                    'size' => ['values' => ['sm', 'md', 'lg'], 'default' => 'md'],
                ],
            ],
        ],

        'list-card' => [
            'name' => 'List card',
            'group' => 'Content',
            'description' => 'Related rows on a raised surface, with an optional heading and footer note.',
        ],

        'list-row' => [
            'name' => 'List row',
            'group' => 'Content',
            'description' => 'One row of a list: title, description, a leading and a trailing slot.',
            'playground' => [
                'template' => "<x-plinth::list-card>\n    <li><x-plinth::list-row href=\"#\" description=\"Monthly, by email\"{attributes}>Invoices</x-plinth::list-row></li>\n</x-plinth::list-card>",
                'states' => ['chevron', 'current', 'disabled', 'selectable', 'selected'],
            ],
        ],

        'list-header' => [
            'name' => 'List header',
            'group' => 'Content',
            'description' => 'The bar on top of a list: its heading and count, its actions, and how many are selected.',
        ],

        'toolbar' => [
            'name' => 'Toolbar',
            'group' => 'Navigation',
            'description' => 'The row of actions under a page header: a search with its scope, the target, grouped actions and a menu.',
        ],

        'app-nav' => [
            'name' => 'App nav',
            'group' => 'Navigation',
            'description' => 'The app\'s main navigation: a sidebar from 1280px, a rail of icons from 768px.',
        ],

        'app-bar' => [
            'name' => 'App bar',
            'group' => 'Navigation',
            'description' => 'The bar at the top of an app, from 768px: the search, a few actions and the account.',
        ],

        'nav-list' => [
            'name' => 'Nav list',
            'group' => 'Navigation',
            'description' => 'A page\'s own navigation: links with counts, in groups with headings.',
            'playground' => [
                'template' => "<x-plinth::nav-list label=\"Folders\" style=\"inline-size: 15rem\">\n    <x-plinth::nav-list-group heading=\"Views\">\n        <x-plinth::nav-list-item href=\"#\" count=\"5\"{attributes}>Assigned to me</x-plinth::nav-list-item>\n    </x-plinth::nav-list-group>\n</x-plinth::nav-list>",
                'states' => ['current'],
            ],
        ],

        'page-header' => [
            'name' => 'Page header',
            'group' => 'Navigation',
            'description' => 'The bar at the top of a page: a leading action, the heading and a few actions.',
        ],

        'pill-row' => [
            'name' => 'Pill row',
            'group' => 'Navigation',
            'description' => 'Filters, segments or sub-pages. Scrolls sideways and snaps on a phone.',
        ],

        'section-menu' => [
            'name' => 'Section menu',
            'group' => 'Navigation',
            'description' => 'The row under the page header that switches between a page\'s sections.',
        ],

        'stat' => [
            'name' => 'Stat',
            'group' => 'Content',
            'description' => 'One metric on a tile for a dashboard: a label, the value and a supporting line.',
            'playground' => [
                'template' => '<x-plinth::stat label="Success rate"{attributes} description="{description}" />',
                'options' => [
                    'tone' => [
                        'values' => ['neutral', 'success', 'warning', 'danger'],
                        'default' => 'neutral',
                        'content' => [
                            'neutral' => ['{description}' => 'Target 90%'],
                            'success' => ['{description}' => 'Up 2 points this week'],
                            'warning' => ['{description}' => 'Down 3 points this week'],
                            'danger' => ['{description}' => 'Below the 90% target'],
                        ],
                    ],
                    'value' => [
                        'values' => ['shown', 'empty'],
                        'default' => 'shown',
                        'print' => ['shown' => 'value="94%"', 'empty' => ''],
                    ],
                    'link' => [
                        'values' => ['none', 'shown'],
                        'default' => 'none',
                        'print' => ['shown' => 'href="#"'],
                    ],
                ],
            ],
        ],

        'timeline' => [
            'name' => 'Timeline',
            'group' => 'Content',
            'description' => 'A conversation or an activity feed on one line: posts, internal notes and events.',
            'playground' => [
                'template' => "<x-plinth::timeline label=\"Conversation\">\n    <x-plinth::timeline-post author=\"Sam Lee\" detail=\"{detail}\" time=\"09:21\"{attributes}>\n        <p>{body}</p>\n    </x-plinth::timeline-post>\n</x-plinth::timeline>",
                'options' => [
                    'kind' => [
                        'values' => ['team', 'customer', 'note'],
                        'default' => 'team',
                        'content' => [
                            'team' => ['{detail}' => 'Support team', '{body}' => 'Thanks, we are on it.'],
                            'customer' => ['{detail}' => 'sam.lee@example.com', '{body}' => 'The export stops with an error.'],
                            'note' => ['{detail}' => 'Support team', '{body}' => 'Only reports over 3,000 rows fail.'],
                        ],
                    ],
                ],
            ],
        ],

        'app-shell' => [
            'name' => 'App shell',
            'group' => 'Layout',
            'description' => 'The app\'s frame: the app nav, the app bar and the page, which scrolls on its own.',
        ],

        'split-view' => [
            'name' => 'Split view',
            'group' => 'Layout',
            'description' => 'A list beside its detail, and folders from 1280px; one pane on a phone.',
        ],

        'dialog' => [
            'name' => 'Dialog',
            'group' => 'Overlays',
            'description' => 'A modal for a form, details or settings, centred at every width.',
            'playground' => [
                'template' => "<x-plinth::button variant=\"secondary\" commandfor=\"playground-dialog\" command=\"show-modal\">Edit project</x-plinth::button>\n<x-plinth::dialog id=\"playground-dialog\" title=\"Edit project\" description=\"The name shows to everyone in the workspace.\"{attributes}>\n    <p>Rename the project, or move it to another workspace.</p>\n    <x-slot:footer>\n        <x-plinth::button variant=\"secondary\" commandfor=\"playground-dialog\" command=\"close\">Cancel</x-plinth::button>\n        <x-plinth::button commandfor=\"playground-dialog\" command=\"close\">Save</x-plinth::button>\n    </x-slot:footer>\n</x-plinth::dialog>",
                'options' => [
                    'dismissible' => [
                        'values' => ['true', 'false'],
                        'default' => 'true',
                        'print' => ['false' => ':dismissible="false"'],
                    ],
                    'side-phone' => ['values' => ['center', 'bottom'], 'default' => 'center'],
                ],
            ],
        ],

        'confirm-dialog' => [
            'name' => 'Confirmation dialog',
            'group' => 'Overlays',
            'description' => 'Asks before an action happens: a yes, a phrase typed exactly, or a password.',
            'playground' => [
                'template' => "<x-plinth::button variant=\"secondary\" commandfor=\"playground-confirm\" command=\"show-modal\">{opener}</x-plinth::button>\n<x-plinth::confirm-dialog id=\"playground-confirm\" title=\"{title}\" message=\"{message}\" confirm-label=\"{confirm}\"{attributes} />",
                'options' => [
                    'kind' => [
                        'values' => ['simple', 'type', 'password'],
                        'default' => 'simple',
                        'print' => ['type' => 'kind="type" phrase="harbour"'],
                        'content' => [
                            'simple' => ['{opener}' => 'Archive 3 tickets', '{title}' => 'Archive 3 tickets?', '{message}' => 'You can bring them back from the archive.', '{confirm}' => 'Archive'],
                            'type' => ['{opener}' => 'Delete project', '{title}' => 'Delete this project?', '{message}' => 'Its tickets and files go with it, and this cannot be undone.', '{confirm}' => 'Delete project'],
                            'password' => ['{opener}' => 'Change billing email', '{title}' => 'Change the billing email?', '{message}' => 'Enter your password to go on.', '{confirm}' => 'Change email'],
                        ],
                    ],
                    'tone' => ['values' => ['neutral', 'danger'], 'default' => 'neutral'],
                ],
                'states' => ['busy'],
            ],
        ],

        'drawer' => [
            'name' => 'Drawer',
            'group' => 'Overlays',
            'description' => 'A bottom panel the person drags on a phone, with snap points; a dialog or a sheet on a desktop.',
            'playground' => [
                'template' => "<x-plinth::button variant=\"secondary\" commandfor=\"playground-drawer\" command=\"show-modal\">Show the route</x-plinth::button>\n<x-plinth::drawer id=\"playground-drawer\" title=\"Route to the library\" description=\"12 min by bike, 3.4 km.\"{attributes}>\n    <p>Head north on Harbour Road, cross the old bridge, and the library is on the left.</p>\n</x-plinth::drawer>",
                'options' => [
                    'snap-points' => ['values' => ['none', 'peek half full', 'half full'], 'default' => 'none'],
                    'desktop' => ['values' => ['dialog', 'sheet'], 'default' => 'dialog'],
                ],
            ],
        ],

        'menu' => [
            'name' => 'Menu',
            'group' => 'Overlays',
            'description' => 'A short list of actions in a popover, anchored to the button that opens it.',
            'playground' => [
                'template' => "<x-plinth::icon-button label=\"More actions\" variant=\"ghost\" popovertarget=\"playground-menu\"><x-site.glyph name=\"more\" /></x-plinth::icon-button>\n<x-plinth::menu id=\"playground-menu\">\n    <x-plinth::menu-item shortcut=\"⌘D\">Duplicate</x-plinth::menu-item>\n    <x-plinth::menu-separator />\n    <x-plinth::menu-item{attributes}>Delete</x-plinth::menu-item>\n</x-plinth::menu>",
                'options' => [
                    'tone' => ['values' => ['neutral', 'danger'], 'default' => 'danger'],
                ],
                'states' => ['disabled'],
            ],
        ],

        'menu-sheet' => [
            'name' => 'Menu sheet',
            'group' => 'Overlays',
            'description' => 'The app shell\'s menu: the signed-in user, navigation and account actions.',
        ],

        'sheet' => [
            'name' => 'Sheet',
            'group' => 'Overlays',
            'description' => 'A modal panel on the edge you pick, at every width, and another on a phone.',
            'playground' => [
                'template' => "<x-plinth::button variant=\"secondary\" commandfor=\"playground-sheet\" command=\"show-modal\">Filters</x-plinth::button>\n<x-plinth::sheet id=\"playground-sheet\" title=\"Filters\"{attributes}>\n    <p>Show the invoices that are due this month.</p>\n</x-plinth::sheet>",
                'options' => [
                    'side' => ['values' => ['end', 'start', 'top', 'bottom'], 'default' => 'end'],
                    'side-phone' => ['values' => ['none', 'start', 'end', 'top', 'bottom'], 'default' => 'none'],
                ],
            ],
        ],

    ],

    /*
    | The components that are coming, by their issue.
    */

    'coming' => [],

];
