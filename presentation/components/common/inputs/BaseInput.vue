<template>
  <client-only>
    <validation-provider
      v-slot="{ errors, valid, invalid, validated }"
      :rules="rules"
      :name="name"
      v-bind="$attrs"
    >
      <div :class="{ 'is-invalid': validated && invalid }">
        <slot name="label">
          <label v-if="label" :id="id" :class="labelClasses">
            {{ label }} <span v-if="rules">(*)</span>
          </label>
        </slot>
        <div
          :class="[
            { 'input-group': hasIcon },
            { focused: focused },
            { 'has-label': label || $slots.label },
            inputGroupClasses,
          ]"
        >
          <div v-if="prependIcon || $slots.prepend" class="input-group-prepend">
            <span class="input-group-text">
              <slot name="prepend">
                <i :class="prependIcon"></i>
              </slot>
            </span>
          </div>
          <slot v-bind="slotData">
            <input
              :id="id"
              ref="name"
              :type="type"
              v-bind="$attrs"
              :valid="valid"
              :readonly="readonly"
              :required="required"
              class="form-control"
              :class="[
                { 'is-valid': (valid && !readonly) || autoValid },
                { 'is-invalid': invalid && validated && !readonly },
                inputClasses,
              ]"
              v-on="listeners"
            />
          </slot>
          <div v-if="appendIcon || $slots.append" class="input-group-append">
            <span class="input-group-text">
              <slot name="append">
                <i :class="appendIcon"></i>
              </slot>
            </span>
          </div>
          <slot name="infoBlock"></slot>
        </div>
        <slot name="success">
          <div v-if="valid && validated" class="valid-feedback">
            {{ successMessage }}
          </div>
        </slot>
        <slot name="error">
          <div v-if="errors[0]" class="text-danger text-left" style="display: block">
            {{ errors[0] }}
          </div>
        </slot>
      </div>
    </validation-provider>
  </client-only>
</template>
<script>
const focus = {
  inserted(el) {
    el.focus()
  },
}
export default {
  name: 'BaseInput',
  directives: { focus },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
      description: 'Whether input is required (adds an asterix *)',
    },
    group: {
      type: Boolean,
      default: false,
      description:
        'Whether input is an input group (manual override in special cases)',
    },
    label: {
      type: String,
      required: false,
      default: '',
      description: 'Input label (text before input)',
    },
    error: {
      type: String,
      default: '',
      description: 'Input error (below input)',
    },
    successMessage: {
      type: String,
      description: 'Input success message',
      default: '',
    },
    labelClasses: {
      type: String,
      description: 'Input label css classes',
      default: 'form-control-label float-left',
    },
    inputClasses: {
      type: String,
      default: '',
      description: 'Input css classes',
    },
    inputGroupClasses: {
      type: String,
      default: '',
      description: 'Input group css classes',
    },
    type: {
      type: String,
      description: 'Input type',
      default: 'text',
    },
    appendIcon: {
      type: String,
      default: '',
      description: 'Append icon (right)',
    },
    prependIcon: {
      type: String,
      default: '',
      description: 'Prepend icon (left)',
    },
    rules: {
      type: [String, Array, Object],
      description: 'Vee validate validation rules',
      default: '',
    },
    name: {
      type: String,
      description: 'Input name (used for validation)',
      default: '',
    },
    autoValid: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focused: false,
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur,
      }
    },
    slotData() {
      return {
        focused: this.focused,
        error: this.error,
        ...this.listeners,
      }
    },
    hasIcon() {
      const { append, prepend } = this.$slots
      return (
        append !== undefined ||
        prepend !== undefined ||
        this.appendIcon !== undefined ||
        this.prependIcon !== undefined ||
        this.group
      )
    },
  },
  methods: {
    updateValue(evt) {
      const value = evt.target.value
      this.$emit('input', value)
    },
    onFocus(evt) {
      this.focused = true
      this.$emit('focus', evt)
    },
    onBlur(evt) {
      this.focused = false
      this.$emit('blur', evt)
    },
    autoFocus() {
      this.$refs.name.focus()
    },
  },
}
</script>
<style></style>
