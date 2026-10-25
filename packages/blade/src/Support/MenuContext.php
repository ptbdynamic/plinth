<?php

namespace BDynamic\Plinth\Support;

use Illuminate\View\Factory;
use ReflectionProperty;

/**
 * The id of the <x-plinth::menu> an item is rendered in, so a button item can close it with
 * commandfor. Blade renders a component's slot before its view, so the menu can't hand its id down
 * itself, and @aware would also find an `id` given to any component whose view the menu sits in.
 * This finds the nearest menu on the view factory's component stack instead.
 */
final class MenuContext
{
    public static function id(Factory $factory): ?string
    {
        /** @var list<mixed> $stack */
        $stack = (new ReflectionProperty(Factory::class, 'componentStack'))->getValue($factory);
        /** @var array<int, array<string, mixed>> $data */
        $data = (new ReflectionProperty(Factory::class, 'componentData'))->getValue($factory);
        $menu = realpath(__DIR__.'/../../resources/views/components/menu.blade.php');

        for ($i = count($stack) - 1; $i >= 0; $i--) {
            $view = $stack[$i];
            if (! is_string($view) || ! str_ends_with($view, '::menu') || realpath($factory->getFinder()->find($view)) !== $menu) {
                continue;
            }
            $id = $data[$i]['id'] ?? null;

            return is_scalar($id) && trim((string) $id) !== '' ? trim((string) $id) : null;
        }

        return null;
    }
}
