{{-- Markup contract: packages/css/src/components/data-table.css --}}
@props([
    'sort' => null,
    'numeric' => false,
    'hideOnPhone' => false,
    'priority' => null,
])
@php
    $root = array_filter([
        'class' => 'plinth-data-table-column',
        'role' => 'columnheader',
        'scope' => 'col',
        'aria-sort' => filled($sort) ? \BDynamic\Plinth\Enums\DataTableSort::resolve($sort)->value : null,
        'data-numeric' => $numeric ? '' : null,
        'data-phone' => $hideOnPhone ? 'hidden' : null,
        'data-priority' => filled($priority) ? \BDynamic\Plinth\Enums\DataTablePriority::resolve(is_int($priority) ? (string) $priority : $priority)->value : null,
    ], fn ($value) => $value !== null);
@endphp
<th {{ $attributes->merge($root) }}>{{ $slot }}</th>
