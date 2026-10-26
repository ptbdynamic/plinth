{{-- Markup contract: packages/css/src/components/one-time-code.css --}}
@props([
    'label' => null,
    'hideLabel' => false,
    'id' => null,
    'length' => 6,
    'description' => null,
    'error' => null,
    'disabled' => false,
    'autosubmit' => false,
])
@php
    if (blank($label)) {
        throw new InvalidArgumentException('<x-plinth::one-time-code> needs a label: it is the field\'s accessible name.');
    }
    $id = filled($id) ? trim($id) : 'plinth-one-time-code-'.\Illuminate\Support\Str::lower(\Illuminate\Support\Str::random(8));
    $length = \BDynamic\Plinth\Support\OneTimeCode::length($length);
    // What Vue and React do in the Blade layer, with Alpine: only digits stay, from typing, a paste
    // or autofill, and with autosubmit the form is sent once every digit is in.
    $behaviour = '{ length: '.$length.', autosubmit: '.($autosubmit ? 'true' : 'false').', '
        .'digits(value) { return value.replace(/\D/g, \'\').slice(0, this.length); }, '
        .'input() { const code = this.digits(this.$el.value); if (this.$el.value !== code) this.$el.value = code; '
        .'if (this.autosubmit && code.length === this.length) this.$el.form?.requestSubmit(); }, '
        .'paste(event) { event.preventDefault(); const text = event.clipboardData?.getData(\'text\') ?? \'\'; '
        .'this.$el.value = this.digits(this.$el.value.slice(0, this.$el.selectionStart) + text + this.$el.value.slice(this.$el.selectionEnd)); '
        .'this.$el.dispatchEvent(new Event(\'input\', { bubbles: true })); } }';
    // The project's class goes on the root; every other attribute on the input, where it wins.
    $input = array_filter([
        'id' => $id,
        'type' => 'text',
        'class' => 'plinth-one-time-code-input',
        'inputmode' => 'numeric',
        'autocomplete' => 'one-time-code',
        'pattern' => '[0-9]{'.$length.'}',
        'maxlength' => (string) $length,
        'aria-describedby' => \BDynamic\Plinth\Support\Field::describedBy($id, $description, $error),
        'aria-invalid' => filled($error) ? 'true' : null,
        'disabled' => $disabled ? '' : null,
        'x-data' => $behaviour,
        'x-on:input' => 'input',
        'x-on:paste' => 'paste',
    ], fn ($value) => $value !== null);
@endphp
<x-plinth::field :id="$id" :label="$label" :hide-label="$hideLabel" :description="$description" :error="$error" {{ $attributes->only('class')->class('plinth-one-time-code') }}>
    <input {{ $attributes->except('class')->merge($input) }}>
</x-plinth::field>
