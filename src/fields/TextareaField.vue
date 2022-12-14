<script lang="ts" setup>
import { computed, getCurrentInstance, useAttrs } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    label?: string
    placeholder?: string
    errorMessage?: string
  }>(),
  {
    label: '',
    placeholder: ' ',
    errorMessage: '',
  },
)

const emit = defineEmits<{
  (event: 'update:model-value', value: string | number): void
}>()

const attrs = useAttrs()

const uid = getCurrentInstance()?.uid

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const listeners = computed(() => ({
  input: (event: Event) => {
    const eventTarget = event.target as HTMLTextAreaElement

    if (props.modelValue === eventTarget.value) return

    emit('update:model-value', eventTarget.value)
  },
}))

const textareaClasses = computed(() =>
  [
    'textarea-field',
    ...(isDisabled.value ? ['textarea-field--disabled'] : []),
    ...(isReadonly.value ? ['textarea-field--readonly'] : []),
    ...(props.errorMessage ? ['textarea-field--error'] : []),
  ].join(' '),
)

const setHeightCSSVar = (element: HTMLElement) => {
  element.style.setProperty(
    '--field-error-msg-height',
    `${element.scrollHeight}px`,
  )
}
</script>

<template>
  <div :class="textareaClasses">
    <label
      v-if="label"
      :for="`textarea-field--${uid}`"
      class="textarea-field__label"
    >
      {{ label }}
    </label>
    <div class="textarea-field__textarea-wrp">
      <textarea
        class="textarea-field__textarea"
        :id="`textarea-field--${uid}`"
        v-bind="$attrs"
        v-on="listeners"
        :value="modelValue"
        :placeholder="placeholder"
        :tabindex="isDisabled || isReadonly ? -1 : $attrs.tabindex"
        :disabled="isDisabled || isReadonly"
      />
    </div>
    <transition
      name="textarea-field__err-msg-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <span v-if="errorMessage" class="textarea-field__err-msg">
        {{ errorMessage }}
      </span>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.textarea-field {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex: 1;

  &--disabled,
  &--readonly {
    opacity: 0.5;
  }
}

.textarea-field__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @include field-label;

  .textarea-field--error & {
    color: var(--field-error);
  }
}

.textarea-field__textarea-wrp {
  display: flex;
  flex-direction: column;
  position: relative;
}

.textarea-field__textarea {
  padding: var(--field-padding);
  transition-property: box-shadow;
  resize: none;
  min-height: toRem(130);

  @include field-text;

  @include field-border;

  &::-webkit-input-placeholder {
    @include field-placeholder;
  }

  &::-moz-placeholder {
    @include field-placeholder;
  }

  &:-moz-placeholder {
    @include field-placeholder;
  }

  &:-ms-input-placeholder {
    @include field-placeholder;
  }

  &::placeholder {
    @include field-placeholder;
  }

  &:not(:read-only) {
    box-shadow: inset 0 0 0 toRem(50) var(--field-bg);
  }

  // Hide number arrows
  &[type='number'] {
    -moz-appearance: textfield;

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .textarea-field--error & {
    border-color: var(--field-error);
  }

  &:not([disabled]):focus {
    box-sizing: border-box;
    box-shadow: 0 0 0 toRem(1.5) var(--field-border-focus);
    border-color: var(--field-border-focus);
  }

  &:not([disabled]):not(:focus):hover {
    border-color: var(--field-border-hover);
  }
}

.textarea-field__err-msg {
  @include field-error;
}

.textarea-field__err-msg-transition-enter-active {
  animation: fade-down var(--field-transition-duration);
}

.textarea-field__err-msg-transition-leave-active {
  animation: fade-down var(--field-transition-duration) reverse;
}

@keyframes fade-down {
  from {
    height: 0;
  }

  to {
    height: var(--field-error-msg-height);
  }
}
</style>
