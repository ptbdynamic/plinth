{{-- Markup contract: packages/css/src/components/data-table.css --}}
@props([
    'label' => null,
    'kind' => 'field',
    'numeric' => false,
    'hideOnPhone' => false,
    'priority' => null,
])
@php
    $root = array_filter([
        'class' => 'plinth-data-table-cell',
        'role' => 'cell',
        'data-kind' => \BDynamic\Plinth\Enums\DataTableCellKind::resolve($kind)->value,
        'data-numeric' => $numeric ? '' : null,
        'data-phone' => $hideOnPhone ? 'hidden' : null,
        'data-priority' => filled($priority) ? \BDynamic\Plinth\Enums\DataTablePriority::resolve(is_int($priority) ? (string) $priority : $priority)->value : null,
    ], fn ($value) => $value !== null);
@endphp
<td {{ $attributes->merge($root) }}>
    @if (filled($label))
        <span class="plinth-data-table-label" aria-hidden="true">{{ $label }}</span>
    @endif
    <span class="plinth-data-table-value">{{ $slot }}</span>
</td>
