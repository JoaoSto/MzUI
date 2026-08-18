<template>
    <!-- Input Text -->
    <div 
        v-if="type === 'text'" 
        class="input-wrapper" 
        :class="[inputWrapperClasses, { 'input-wrapper--full-width': fullWidth }]"
    >
        <span class="input-label">{{ label }}</span>
        <input
            ref="inputRef"
            v-model="inputValue"
            type="text"
            class="input"
            :placeholder="placeholder"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
        />
    </div>

    <!-- Input Password -->
    <div 
        v-else-if="type === 'password'" 
        class="input-wrapper input-wrapper--password" 
        :class="[passwordWrapperClasses, { 'input-wrapper--full-width': fullWidth }]"
    >
        <span class="input-label">{{ label }}</span>
        <input
            ref="passwordInputRef"
            v-model="passwordInputValue"
            :type="showPassword ? 'text' : 'password'"
            class="input input--password"
            :placeholder="placeholder"
            @input="handlePasswordInput"
            @focus="handlePasswordFocus"
            @blur="handlePasswordBlur"
        />
        <button
            type="button"
            class="password-toggle-button"
            @click="togglePasswordVisibility"
            @mousedown.prevent
            tabindex="-1"
            aria-label="Toggle password visibility"
        >
            <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"></i>
        </button>
    </div>

    <!-- Input Date -->
    <div 
        v-else-if="type === 'date'" 
        class="input-wrapper input-wrapper--date" 
        :class="[dateWrapperClasses, { 'input-wrapper--full-width': fullWidth }]" 
        ref="dateWrapperRef"
    >
        <span class="input-label">{{ label }}</span>
        <input
            ref="dateInputRef"
            :value="displayDateValue"
            type="text"
            class="input input--date"
            :placeholder="placeholder"
            readonly
            @click="toggleDateCalendar"
            @focus="handleDateFocus"
            @blur="handleDateBlur"
        />
        <button
            type="button"
            class="datetime-now-button"
            @click="setCurrentDate"
            @mousedown.prevent
            tabindex="-1"
            aria-label="Set current date"
        >
            <i class="ri-time-line"></i>
        </button>
        <div v-if="isDateCalendarOpen" class="date-calendar-dropdown" :style="dateCalendarStyle">
            <div class="date-calendar-header">
                <button
                    type="button"
                    class="date-calendar-nav-button"
                    @click="previousMonth"
                    @mousedown.prevent
                    aria-label="Previous month"
                >
                    <i class="ri-arrow-left-s-line"></i>
                </button>
                <div class="date-calendar-month-year">
                    <span class="date-calendar-month">{{ currentMonthName }}</span>
                    <span class="date-calendar-year">{{ currentYear }}</span>
                </div>
                <button
                    type="button"
                    class="date-calendar-nav-button"
                    @click="nextMonth"
                    @mousedown.prevent
                    aria-label="Next month"
                >
                    <i class="ri-arrow-right-s-line"></i>
                </button>
            </div>
            <div class="date-calendar-weekdays">
                <div class="date-calendar-weekday" v-for="day in weekDays" :key="day">{{ day }}</div>
            </div>
            <div class="date-calendar-days">
                <button
                    v-for="day in calendarDays"
                    :key="day.key"
                    type="button"
                    class="date-calendar-day"
                    :class="{
                        'date-calendar-day--other-month': day.isOtherMonth,
                        'date-calendar-day--today': day.isToday,
                        'date-calendar-day--selected': day.isSelected
                    }"
                    @click="selectDate(day.date)"
                    @mousedown.prevent
                >
                    {{ day.day }}
                </button>
            </div>
        </div>
    </div>

    <!-- Input Time -->
    <div 
        v-else-if="type === 'time'" 
        class="input-wrapper input-wrapper--time" 
        :class="[timeWrapperClasses, { 'input-wrapper--full-width': fullWidth }]" 
        ref="timeWrapperRef"
    >
        <span class="input-label">{{ label }}</span>
        <input
            ref="timeInputRef"
            :value="displayTimeValue"
            type="text"
            class="input input--time"
            :placeholder="placeholder"
            readonly
            @click="toggleTimePicker"
            @focus="handleTimeFocus"
            @blur="handleTimeBlur"
        />
        <button
            type="button"
            class="datetime-now-button"
            @click="setCurrentTime"
            @mousedown.prevent
            tabindex="-1"
            aria-label="Set current time"
        >
            <i class="ri-time-line"></i>
        </button>
        <div v-if="isTimePickerOpen" class="time-picker-dropdown" :style="timePickerStyle">
            <div class="time-picker-container">
                <div class="time-picker-section">
                    <div class="time-picker-label">HORA</div>
                    <div class="time-picker-scroll">
                        <button
                            v-for="hour in hours"
                            :key="hour"
                            type="button"
                            class="time-picker-option"
                            :class="{ 'time-picker-option--selected': selectedHour === hour }"
                            @click="selectHour(hour)"
                            @mousedown.prevent
                        >
                            {{ String(hour).padStart(2, '0') }}
                        </button>
                    </div>
                </div>
                <div class="time-picker-separator">:</div>
                <div class="time-picker-section">
                    <div class="time-picker-label">MINUTO</div>
                    <div class="time-picker-scroll">
                        <button
                            v-for="minute in minutes"
                            :key="minute"
                            type="button"
                            class="time-picker-option"
                            :class="{ 'time-picker-option--selected': selectedMinute === minute }"
                            @click="selectMinute(minute)"
                            @mousedown.prevent
                        >
                            {{ String(minute).padStart(2, '0') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Input DateTime -->
    <div 
        v-else-if="type === 'datetime'" 
        class="input-wrapper input-wrapper--datetime" 
        :class="[datetimeWrapperClasses, { 'input-wrapper--full-width': fullWidth }]" 
        ref="datetimeWrapperRef"
    >
        <span class="input-label">{{ label }}</span>
        <input
            ref="datetimeInputRef"
            :value="displayDateTimeValue"
            type="text"
            class="input input--datetime"
            :placeholder="placeholder"
            readonly
            @click="toggleDatetimePicker"
            @focus="handleDatetimeFocus"
            @blur="handleDatetimeBlur"
        />
        <button
            type="button"
            class="datetime-now-button"
            @click="setCurrentDateTime"
            @mousedown.prevent
            tabindex="-1"
            aria-label="Set current date and time"
        >
            <i class="ri-time-line"></i>
        </button>
        <div v-if="isDatetimePickerOpen" class="datetime-picker-dropdown" :style="datetimePickerStyle">
            <div class="datetime-picker-date-section">
                <div class="date-calendar-header">
                    <button
                        type="button"
                        class="date-calendar-nav-button"
                        @click="previousDatetimeMonth"
                        @mousedown.prevent
                        aria-label="Previous month"
                    >
                        <i class="ri-arrow-left-s-line"></i>
                    </button>
                    <div class="date-calendar-month-year">
                        <span class="date-calendar-month">{{ datetimeMonthName }}</span>
                        <span class="date-calendar-year">{{ datetimeYear }}</span>
                    </div>
                    <button
                        type="button"
                        class="date-calendar-nav-button"
                        @click="nextDatetimeMonth"
                        @mousedown.prevent
                        aria-label="Next month"
                    >
                        <i class="ri-arrow-right-s-line"></i>
                    </button>
                </div>
                <div class="date-calendar-weekdays">
                    <div class="date-calendar-weekday" v-for="day in weekDays" :key="day">{{ day }}</div>
                </div>
                <div class="date-calendar-days">
                    <button
                        v-for="day in datetimeCalendarDays"
                        :key="day.key"
                        type="button"
                        class="date-calendar-day"
                        :class="{
                            'date-calendar-day--other-month': day.isOtherMonth,
                            'date-calendar-day--today': day.isToday,
                            'date-calendar-day--selected': day.isSelected
                        }"
                        @click="selectDatetimeDate(day.date)"
                        @mousedown.prevent
                    >
                        {{ day.day }}
                    </button>
                </div>
            </div>
            <div class="datetime-picker-time-section">
                <div class="time-picker-container">
                    <div class="time-picker-section">
                        <div class="time-picker-label">HORA</div>
                        <div class="time-picker-scroll">
                            <button
                                v-for="hour in hours"
                                :key="hour"
                                type="button"
                                class="time-picker-option"
                                :class="{ 'time-picker-option--selected': selectedDatetimeHour === hour }"
                                @click="selectDatetimeHour(hour)"
                                @mousedown.prevent
                            >
                                {{ String(hour).padStart(2, '0') }}
                            </button>
                        </div>
                    </div>
                    <div class="time-picker-separator">:</div>
                    <div class="time-picker-section">
                        <div class="time-picker-label">MINUTO</div>
                        <div class="time-picker-scroll">
                            <button
                                v-for="minute in minutes"
                                :key="minute"
                                type="button"
                                class="time-picker-option"
                                :class="{ 'time-picker-option--selected': selectedDatetimeMinute === minute }"
                                @click="selectDatetimeMinute(minute)"
                                @mousedown.prevent
                            >
                                {{ String(minute).padStart(2, '0') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Select -->
    <div 
        v-else-if="type === 'select'" 
        class="select-wrapper" 
        :class="[selectWrapperClasses, { 'select-wrapper--full-width': fullWidth }]" 
        ref="selectWrapperRef"
    >
        <span class="select-label">{{ label }}</span>
        <button
            ref="selectButtonRef"
            type="button"
            class="select-button"
            @click="toggleSelectDropdown"
            @focus="handleSelectFocus"
            @blur="handleSelectBlur"
            @keydown="handleSelectKeydown"
        >
            <span class="select-button-text" :class="{ 'select-button-text--placeholder': !hasSelectValue && isSelectActive }">{{ selectedOptionText }}</span>
        </button>
        <i class="select-arrow ri-arrow-down-s-line" aria-hidden="true"></i>
        <div v-if="isSelectOpen" class="select-dropdown" :style="dropdownStyle">
            <button
                v-for="(option, index) in options"
                :key="option.value"
                type="button"
                class="select-option"
                :class="{ 
                    'select-option--selected': selectValue === option.value,
                    'select-option--active': activeSelectIndex === index
                }"
                @mousedown.prevent
                @click="selectOption(option.value)"
                @mouseenter="activeSelectIndex = index"
            >
                {{ option.label }}
            </button>
        </div>
    </div>

    <!-- Autocomplete -->
    <div 
        v-else-if="type === 'autocomplete'" 
        class="autocomplete-wrapper" 
        :class="[autocompleteWrapperClasses, { 'autocomplete-wrapper--full-width': fullWidth }]" 
        ref="autocompleteWrapperRef"
    >
        <span class="autocomplete-label">{{ label }}</span>
        <input
            ref="autocompleteInputRef"
            v-model="autocompleteInputValue"
            type="text"
            class="autocomplete-input"
            :placeholder="placeholder"
            @input="handleAutocompleteInput"
            @focus="handleAutocompleteFocus"
            @blur="handleAutocompleteBlur"
            @keydown="handleAutocompleteKeydown"
        />
        <i class="autocomplete-arrow ri-arrow-down-s-line" aria-hidden="true"></i>
        <div v-if="isAutocompleteOpen && filteredAutocompleteOptions.length > 0" class="autocomplete-dropdown" :style="autocompleteDropdownStyle">
            <button
                v-for="(option, index) in filteredAutocompleteOptions"
                :key="option.value"
                type="button"
                class="autocomplete-option"
                :class="{ 
                    'autocomplete-option--selected': autocompleteValue === option.value,
                    'autocomplete-option--active': activeAutocompleteIndex === index
                }"
                @mousedown.prevent
                @click="selectAutocompleteOption(option.value)"
                @mouseenter="activeAutocompleteIndex = index"
            >
                {{ option.label }}
            </button>
        </div>
    </div>

    <!-- Input Email -->
    <div 
        v-else-if="type === 'email'" 
        class="input-wrapper input-wrapper--email" 
        :class="[emailWrapperClasses, { 'input-wrapper--full-width': fullWidth }]" 
        ref="emailWrapperRef"
    >
        <span class="input-label">{{ label }}</span>
        <input
            ref="emailInputRef"
            v-model="emailInputValue"
            type="email"
            class="input input--email"
            :placeholder="placeholder"
            @input="handleEmailInput"
            @keydown="handleEmailKeydown"
            @focus="handleEmailFocus"
            @blur="handleEmailBlur"
        />
        <div v-if="showEmailSuggestions && emailSuggestions.length > 0" class="email-suggestions" :style="emailSuggestionsStyle">
            <button
                v-for="(suggestion, index) in emailSuggestions"
                :key="suggestion"
                type="button"
                class="email-suggestion"
                :class="{ 'email-suggestion--active': activeSuggestionIndex === index }"
                @mousedown.prevent
                @click="applyEmailSuggestion(suggestion)"
                @mouseenter="activeSuggestionIndex = index"
            >
                {{ formatEmailSuggestion(suggestion) }}
            </button>
        </div>
    </div>

    <!-- Input Number -->
    <div 
        v-else-if="type === 'number'" 
        class="input-wrapper input-wrapper--number" 
        :class="[numberWrapperClasses, { 'input-wrapper--full-width': fullWidth }]" 
    >
        <span class="input-label">{{ label }}</span>
        <input
            ref="numberInputRef"
            v-model="numberInputValue"
            type="number"
            class="input input--number"
            :placeholder="placeholder"
            @input="handleNumberInput"
            @focus="handleNumberFocus"
            @blur="handleNumberBlur"
        />
        <div class="number-controls">
            <button
                type="button"
                class="number-control-button"
                @click="decrementNumber"
                @mousedown.prevent
                tabindex="-1"
                aria-label="Decrementar"
            >
                <i class="ri-subtract-line"></i>
            </button>
            <button
                type="button"
                class="number-control-button"
                @click="incrementNumber"
                @mousedown.prevent
                tabindex="-1"
                aria-label="Incrementar"
            >
                <i class="ri-add-line"></i>
            </button>
        </div>
    </div>

    <!-- Input Money -->
    <div 
        v-else-if="type === 'money'" 
        class="input-wrapper input-wrapper--money" 
        :class="[moneyWrapperClasses, { 'input-wrapper--full-width': fullWidth }]"
    >
        <span class="input-label">{{ label }}</span>
        <div class="money-input-container">
            <span v-if="currency && (isMoneyFocused || hasMoneyValue)" class="money-currency-label">{{ currency }}</span>
            <input
                ref="moneyInputRef"
                v-model="moneyDisplayValue"
                type="text"
                class="input input--money"
                :class="{ 'input--money-with-currency': currency }"
                :style="moneyInputStyle"
                :placeholder="placeholder"
                @input="handleMoneyInput"
                @focus="handleMoneyFocus"
                @blur="handleMoneyBlur"
                @keydown="handleMoneyKeydown"
            />
        </div>
    </div>

    <!-- Input Phone -->
    <div 
        v-else-if="type === 'phone'" 
        class="input-wrapper input-wrapper--phone" 
        :class="[phoneWrapperClasses, { 'input-wrapper--full-width': fullWidth }]"
    >
        <span class="input-label">{{ label }}</span>
        <input
            ref="phoneInputRef"
            v-model="phoneDisplayValue"
            type="text"
            class="input input--phone"
            :placeholder="placeholder"
            @input="handlePhoneInput"
            @focus="handlePhoneFocus"
            @blur="handlePhoneBlur"
            @keydown="handlePhoneKeydown"
        />
    </div>

    <!-- Input File -->
    <div 
        v-else-if="type === 'file'" 
        class="input-wrapper input-wrapper--file" 
        :class="[fileWrapperClasses, { 'input-wrapper--full-width': fullWidth }]"
        ref="fileWrapperRef"
        @dragover.prevent="handleFileDragOver"
        @dragleave.prevent="handleFileDragLeave"
        @drop.prevent="handleFileDrop"
    >
        <span class="input-label">{{ label }}</span>
        <div class="file-input-container" :class="{ 'file-input-container--dragging': isFileDragging }">
            <input
                ref="fileInputRef"
                type="file"
                :multiple="multiple"
                class="file-input-hidden"
                @change="handleFileChange"
                @focus="handleFileFocus"
                @blur="handleFileBlur"
            />
            <div 
                class="file-input-display" 
                :class="{ 'file-input-display--multiple': multiple && hasFiles }"
                @click="triggerFileInput" 
                @focus="handleFileFocus"
                @blur="handleFileBlur"
                @keydown="handleFileKeydown"
                tabindex="0"
            >
                <button
                    v-if="hasFiles && !multiple"
                    type="button"
                    class="file-remove-button"
                    @click.stop="removeFile"
                    @mousedown.prevent
                    tabindex="0"
                    aria-label="Remover arquivo"
                >
                    <i class="ri-close-line"></i>
                </button>
                <div class="file-input-icon-wrapper">
                    <i :class="['file-input-icon', hasFiles ? 'ri-file-line' : 'ri-upload-cloud-2-line']"></i>
                    <span v-if="multiple && hasFiles" class="file-input-text file-input-text--count">
                        {{ filesArray.length }} {{ filesArray.length === 1 ? 'arquivo selecionado' : 'arquivos selecionados' }}
                    </span>
                </div>
                <div class="file-input-content">
                    <span v-if="!hasFiles" class="file-input-text">
                        {{ placeholder || 'Arraste arquivos aqui ou clique para selecionar' }}
                    </span>
                    <template v-else>
                        <template v-if="multiple">
                            <div class="file-list">
                                <div 
                                    v-for="(file, index) in filesArray" 
                                    :key="index"
                                    class="file-item"
                                >
                                    <span class="file-item-name">{{ file.name }}</span>
                                    <span class="file-item-size">{{ formatFileSize(file.size) }}</span>
                                    <button
                                        type="button"
                                        class="file-item-remove"
                                        @click.stop="removeFile(index)"
                                        @mousedown.prevent
                                        tabindex="0"
                                        aria-label="Remover arquivo"
                                    >
                                        <i class="ri-close-line"></i>
                                    </button>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <span class="file-input-text file-input-text--has-file">
                                {{ fileInputValue.name }}
                            </span>
                            <span class="file-input-size">
                                {{ formatFileSize(fileInputValue.size) }}
                            </span>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch } from 'vue'

const props = defineProps({
    type: {
        type: String,
        required: true,
        validator: (value) => ['text', 'password', 'date', 'time', 'datetime', 'select', 'autocomplete', 'email', 'number', 'file', 'money', 'phone'].includes(value)
    },
    label: {
        type: String,
        default: 'INPUT'
    },
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    },
    fullWidth: {
        type: Boolean,
        default: false
    },
    multiple: {
        type: Boolean,
        default: false
    },
    currency: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Refs gerais
const inputRef = ref(null)
const passwordInputRef = ref(null)
const dateInputRef = ref(null)
const dateWrapperRef = ref(null)
const timeInputRef = ref(null)
const timeWrapperRef = ref(null)
const datetimeInputRef = ref(null)
const datetimeWrapperRef = ref(null)
const selectWrapperRef = ref(null)
const selectButtonRef = ref(null)
const autocompleteWrapperRef = ref(null)
const autocompleteInputRef = ref(null)
const emailInputRef = ref(null)
const emailWrapperRef = ref(null)
const numberInputRef = ref(null)
const moneyInputRef = ref(null)
const phoneInputRef = ref(null)
const fileInputRef = ref(null)
const fileWrapperRef = ref(null)

// Input Text
const inputValue = ref(props.modelValue || '')
const isInputFocused = ref(false)

// Input Password
const passwordInputValue = ref(props.modelValue || '')
const isPasswordFocused = ref(false)
const showPassword = ref(false)

// Input Date
const dateInputValue = ref(props.modelValue || '')
const isDateFocused = ref(false)
const isDateCalendarOpen = ref(false)
const calendarDate = ref(new Date())

// Input Time
const timeInputValue = ref(props.modelValue || '')
const isTimeFocused = ref(false)
const isTimePickerOpen = ref(false)
const selectedHour = ref(null)
const selectedMinute = ref(null)

// Input DateTime
const datetimeInputValue = ref(props.modelValue || '')
const isDatetimeFocused = ref(false)
const isDatetimePickerOpen = ref(false)
const datetimeCalendarDate = ref(new Date())
const selectedDatetimeHour = ref(null)
const selectedDatetimeMinute = ref(null)

// Select
const selectValue = ref(props.modelValue || '')
const isSelectFocused = ref(false)
const isSelectOpen = ref(false)
const activeSelectIndex = ref(-1)

// Autocomplete
const autocompleteValue = ref(props.modelValue || '')
const autocompleteInputValue = ref('')
const isAutocompleteFocused = ref(false)
const isAutocompleteOpen = ref(false)
const activeAutocompleteIndex = ref(-1)

// Email
const emailInputValue = ref(props.modelValue || '')
const isEmailFocused = ref(false)
const showEmailSuggestions = ref(false)
const activeSuggestionIndex = ref(-1)

// Number
const numberInputValue = ref(props.modelValue || '')
const isNumberFocused = ref(false)

// Money
const moneyValue = ref(props.modelValue || '')
const moneyDisplayValue = ref('')
const isMoneyFocused = ref(false)

// Phone
const phoneValue = ref(props.modelValue || '')
const phoneDisplayValue = ref('')
const isPhoneFocused = ref(false)

// File
const fileInputValue = ref(null)
const isFileFocused = ref(false)
const isFileDragging = ref(false)

// Computed para verificar se há arquivos
const hasFiles = computed(() => {
    if (props.multiple) {
        return Array.isArray(fileInputValue.value) && fileInputValue.value.length > 0
    }
    return fileInputValue.value !== null
})

const filesArray = computed(() => {
    if (props.multiple) {
        return Array.isArray(fileInputValue.value) ? fileInputValue.value : []
    }
    return fileInputValue.value ? [fileInputValue.value] : []
})

const commonDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
    'aol.com', 'mail.com', 'protonmail.com', 'live.com', 'msn.com',
    'yandex.com', 'gmx.com', 'zoho.com', 'mail.ru', 'qq.com',
    'terra.com.br', 'uol.com.br', 'bol.com.br', 'ig.com.br', 'globo.com',
    'yahoo.com.br', 'hotmail.com.br', 'outlook.com.br'
]

const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
const hours = Array.from({ length: 24 }, (_, i) => i)
const minutes = Array.from({ length: 60 }, (_, i) => i)

// Computed para Input Text
const hasValue = computed(() => inputValue.value.trim().length > 0)
const inputWrapperClasses = computed(() => ({
    'input-wrapper--focused': isInputFocused.value,
    'input-wrapper--active': isInputFocused.value || hasValue.value,
}))

// Computed para Password
const hasPasswordValue = computed(() => passwordInputValue.value.trim().length > 0)
const passwordWrapperClasses = computed(() => ({
    'input-wrapper--focused': isPasswordFocused.value,
    'input-wrapper--active': isPasswordFocused.value || hasPasswordValue.value,
}))

// Computed para Date
const currentYear = computed(() => calendarDate.value.getFullYear())
const currentMonth = computed(() => calendarDate.value.getMonth())
const currentMonthName = computed(() => {
    const months = [
        'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
        'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
    ]
    return months[currentMonth.value]
})
const calendarDays = computed(() => {
    const year = currentYear.value
    const month = currentMonth.value
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    const prevMonth = new Date(year, month, 0)
    const daysInPrevMonth = prevMonth.getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, daysInPrevMonth - i)
        days.push({
            key: `prev-${date.getTime()}`,
            day: daysInPrevMonth - i,
            date,
            isOtherMonth: true,
            isToday: false,
            isSelected: false,
        })
    }

    const today = new Date()
    const selectedDate = dateInputValue.value ? new Date(dateInputValue.value) : null
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        const isToday = date.toDateString() === today.toDateString()
        const isSelected = selectedDate ? date.toDateString() === selectedDate.toDateString() : false
        days.push({
            key: `current-${date.getTime()}`,
            day,
            date,
            isOtherMonth: false,
            isToday,
            isSelected,
        })
    }

    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(year, month + 1, day)
        days.push({
            key: `next-${date.getTime()}`,
            day,
            date,
            isOtherMonth: true,
            isToday: false,
            isSelected: false,
        })
    }

    return days
})
const dateCalendarStyle = computed(() => {
    if (!dateInputRef.value) return {}
    const inputRect = dateInputRef.value.getBoundingClientRect()
    const wrapperRect = dateWrapperRef.value?.getBoundingClientRect()
    if (!wrapperRect) {
        return { width: `${inputRect.width}px` }
    }
    const topOffset = inputRect.bottom - wrapperRect.top + 4
    return {
        width: `${inputRect.width}px`,
        top: `${topOffset}px`,
    }
})
const hasDateValue = computed(() => dateInputValue.value.length > 0)
const dateWrapperClasses = computed(() => ({
    'input-wrapper--focused': isDateFocused.value,
    'input-wrapper--active': isDateFocused.value || hasDateValue.value,
}))
const formatDateForDisplay = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}
const displayDateValue = computed(() => formatDateForDisplay(dateInputValue.value))

// Computed para Time
const formatTimeForDisplay = (timeString) => {
    if (!timeString) return ''
    const parts = timeString.split(':')
    if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}`
    }
    return timeString
}
const displayTimeValue = computed(() => formatTimeForDisplay(timeInputValue.value))
const timePickerStyle = computed(() => {
    if (!timeInputRef.value) return {}
    const inputRect = timeInputRef.value.getBoundingClientRect()
    const wrapperRect = timeWrapperRef.value?.getBoundingClientRect()
    if (!wrapperRect) {
        return { width: `${inputRect.width}px` }
    }
    const topOffset = inputRect.bottom - wrapperRect.top + 4
    return {
        width: `${inputRect.width}px`,
        top: `${topOffset}px`,
    }
})
const hasTimeValue = computed(() => timeInputValue.value.length > 0)
const timeWrapperClasses = computed(() => ({
    'input-wrapper--focused': isTimeFocused.value,
    'input-wrapper--active': isTimeFocused.value || hasTimeValue.value,
}))

// Computed para DateTime
const datetimeYear = computed(() => datetimeCalendarDate.value.getFullYear())
const datetimeMonth = computed(() => datetimeCalendarDate.value.getMonth())
const datetimeMonthName = computed(() => {
    const months = [
        'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
        'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
    ]
    return months[datetimeMonth.value]
})
const datetimeCalendarDays = computed(() => {
    const year = datetimeYear.value
    const month = datetimeMonth.value
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    const prevMonth = new Date(year, month, 0)
    const daysInPrevMonth = prevMonth.getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, daysInPrevMonth - i)
        days.push({
            key: `prev-${date.getTime()}`,
            day: daysInPrevMonth - i,
            date,
            isOtherMonth: true,
            isToday: false,
            isSelected: false,
        })
    }

    const today = new Date()
    const selectedDate = datetimeInputValue.value ? new Date(datetimeInputValue.value) : null
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        const isToday = date.toDateString() === today.toDateString()
        const isSelected = selectedDate ? date.toDateString() === selectedDate.toDateString() : false
        days.push({
            key: `current-${date.getTime()}`,
            day,
            date,
            isOtherMonth: false,
            isToday,
            isSelected,
        })
    }

    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(year, month + 1, day)
        days.push({
            key: `next-${date.getTime()}`,
            day,
            date,
            isOtherMonth: true,
            isToday: false,
            isSelected: false,
        })
    }

    return days
})
const formatDateTimeForDisplay = (datetimeString) => {
    if (!datetimeString) return ''
    const date = new Date(datetimeString)
    if (isNaN(date.getTime())) return datetimeString
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}`
}
const displayDateTimeValue = computed(() => formatDateTimeForDisplay(datetimeInputValue.value))
const datetimePickerStyle = computed(() => {
    if (!datetimeInputRef.value) return {}
    const inputRect = datetimeInputRef.value.getBoundingClientRect()
    const wrapperRect = datetimeWrapperRef.value?.getBoundingClientRect()
    if (!wrapperRect) {
        return { width: `${inputRect.width}px` }
    }
    const topOffset = inputRect.bottom - wrapperRect.top + 4
    return {
        width: `${inputRect.width}px`,
        top: `${topOffset}px`,
    }
})
const hasDatetimeValue = computed(() => datetimeInputValue.value.length > 0)
const datetimeWrapperClasses = computed(() => ({
    'input-wrapper--focused': isDatetimeFocused.value,
    'input-wrapper--active': isDatetimeFocused.value || hasDatetimeValue.value,
}))

// Computed para Select
const hasSelectValue = computed(() => selectValue.value && selectValue.value.length > 0)
const isSelectActive = computed(() => isSelectFocused.value || hasSelectValue.value)
const selectedOptionText = computed(() => {
    if (hasSelectValue.value) {
        const option = props.options.find(opt => opt.value === selectValue.value)
        return option ? option.label : ''
    }
    // Só mostra placeholder quando está ativo (focado ou com valor)
    if (isSelectActive.value) {
        return props.placeholder || ''
    }
    return ''
})
const dropdownStyle = computed(() => {
    if (!selectButtonRef.value) return {}
    const buttonRect = selectButtonRef.value.getBoundingClientRect()
    const wrapperRect = selectWrapperRef.value?.getBoundingClientRect()
    if (!wrapperRect) {
        return { width: `${buttonRect.width}px` }
    }
    const topOffset = buttonRect.bottom - wrapperRect.top + 4
    return {
        width: `${buttonRect.width}px`,
        top: `${topOffset}px`,
    }
})
const selectWrapperClasses = computed(() => ({
    'select-wrapper--focused': isSelectFocused.value,
    'select-wrapper--active': isSelectActive.value,
    'select-wrapper--open': isSelectOpen.value,
}))

// Função para normalizar strings (remover acentos e caracteres especiais)
const normalizeString = (str) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .toLowerCase()
        .trim()
}

// Computed para Autocomplete
const hasAutocompleteValue = computed(() => autocompleteValue.value && autocompleteValue.value.length > 0)
const isAutocompleteActive = computed(() => isAutocompleteFocused.value || hasAutocompleteValue.value || autocompleteInputValue.value.length > 0)
const filteredAutocompleteOptions = computed(() => {
    if (!autocompleteInputValue.value.trim()) {
        return props.options
    }
    const searchTerm = normalizeString(autocompleteInputValue.value)
    return props.options.filter(option => 
        normalizeString(option.label).includes(searchTerm)
    )
})
const autocompleteDropdownStyle = computed(() => {
    if (!autocompleteInputRef.value) return {}
    const inputRect = autocompleteInputRef.value.getBoundingClientRect()
    const wrapperRect = autocompleteWrapperRef.value?.getBoundingClientRect()
    if (!wrapperRect) {
        return { width: `${inputRect.width}px` }
    }
    const topOffset = inputRect.bottom - wrapperRect.top + 4
    return {
        width: `${inputRect.width}px`,
        top: `${topOffset}px`,
    }
})
const autocompleteWrapperClasses = computed(() => ({
    'autocomplete-wrapper--focused': isAutocompleteFocused.value,
    'autocomplete-wrapper--active': isAutocompleteActive.value,
    'autocomplete-wrapper--open': isAutocompleteOpen.value,
}))

// Computed para Email
const emailPrefix = computed(() => {
    const atIndex = emailInputValue.value.indexOf('@')
    return atIndex > 0 ? emailInputValue.value.substring(0, atIndex) : ''
})
const emailDomainInput = computed(() => {
    const atIndex = emailInputValue.value.indexOf('@')
    return atIndex >= 0 ? emailInputValue.value.substring(atIndex + 1).toLowerCase() : ''
})
const formatEmailSuggestion = (domain) => {
    const hasAt = emailInputValue.value.includes('@')
    if (hasAt) {
        const prefix = emailPrefix.value || ''
        return `${prefix}@${domain}`
    } else {
        return `${emailInputValue.value || ''}@${domain}`
    }
}
const emailSuggestions = computed(() => {
    if (emailInputValue.value.trim().length === 0) {
        return []
    }
    
    const hasAt = emailInputValue.value.includes('@')
    const input = emailDomainInput.value
    
    if (hasAt) {
        if (!input) {
            return commonDomains.slice(0, 5)
        }
        return commonDomains
            .filter(domain => domain.startsWith(input))
            .slice(0, 5)
    } else {
        return commonDomains.slice(0, 5)
    }
})
const emailSuggestionsStyle = computed(() => {
    if (!emailInputRef.value) return {}
    const rect = emailInputRef.value.getBoundingClientRect()
    const wrapperRect = emailWrapperRef.value?.getBoundingClientRect()
    if (!wrapperRect) return { width: `${rect.width}px` }
    return {
        width: `${rect.width}px`,
        top: `${rect.bottom - wrapperRect.top + 4}px`
    }
})
const hasEmailValue = computed(() => emailInputValue.value.trim().length > 0)
const emailWrapperClasses = computed(() => ({
    'input-wrapper--focused': isEmailFocused.value,
    'input-wrapper--active': isEmailFocused.value || hasEmailValue.value,
}))

// Computed para Number
const hasNumberValue = computed(() => numberInputValue.value !== '' && numberInputValue.value !== null)
const numberWrapperClasses = computed(() => ({
    'input-wrapper--focused': isNumberFocused.value,
    'input-wrapper--active': isNumberFocused.value || hasNumberValue.value,
}))

// Computed para Money
const hasMoneyValue = computed(() => moneyValue.value && moneyValue.value !== '0')
const moneyWrapperClasses = computed(() => ({
    'input-wrapper--focused': isMoneyFocused.value,
    'input-wrapper--active': isMoneyFocused.value || hasMoneyValue.value,
}))
const moneyInputStyle = computed(() => {
    if (!props.currency) return {}
    // Só adiciona padding se o input estiver ativo (focado ou com valor)
    if (!isMoneyFocused.value && !hasMoneyValue.value) return {}
    // Calcula o padding baseado no tamanho aproximado do texto da moeda
    // Cada caractere tem aproximadamente 10px de largura (ajustado para fonte monospace)
    const currencyWidth = props.currency.length * 10 + 8 // 8px de espaçamento extra
    return {
        paddingLeft: `${18 + currencyWidth}px`
    }
})

// Função para formatar valor monetário
const formatMoneyValue = (value) => {
    if (!value && value !== 0) return ''
    
    // Se já for um número, formata diretamente
    const numValue = typeof value === 'number' ? value : parseFloat(value)
    
    if (isNaN(numValue)) return ''
    
    // Formata com vírgula para decimal e ponto para milhar
    return numValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

// Função para obter valor numérico do display
const getMoneyNumericValue = (displayValue) => {
    if (!displayValue) return ''
    // Remove pontos (milhares) e substitui vírgula por ponto
    const numericString = displayValue.replace(/\./g, '').replace(',', '.')
    const numericValue = parseFloat(numericString)
    if (isNaN(numericValue)) return ''
    // Retorna como string numérica (sem formatação)
    return numericValue.toFixed(2)
}

// Computed para Phone
const hasPhoneValue = computed(() => phoneValue.value && phoneValue.value.length > 0)
const phoneWrapperClasses = computed(() => ({
    'input-wrapper--focused': isPhoneFocused.value,
    'input-wrapper--active': isPhoneFocused.value || hasPhoneValue.value,
}))

// Função para formatar telefone
const formatPhoneValue = (value) => {
    if (!value) return ''
    
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    if (numbers.length === 0) return ''
    
    // Formata baseado no tamanho
    if (numbers.length <= 2) {
        return `(${numbers}`
    } else if (numbers.length <= 6) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else if (numbers.length <= 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    } else {
        // 11 dígitos (celular)
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }
}

// Função para obter apenas números do telefone
const getPhoneNumericValue = (displayValue) => {
    if (!displayValue) return ''
    return displayValue.replace(/\D/g, '')
}

// Computed para File
const fileWrapperClasses = computed(() => ({
    'input-wrapper--focused': isFileFocused.value,
    'input-wrapper--active': isFileFocused.value || hasFiles.value,
    'input-wrapper--dragging': isFileDragging.value,
}))

// Funções para Input Text
const handleInput = () => {
    emit('update:modelValue', inputValue.value)
    emit('change', inputValue.value)
}

const handleFocus = () => {
    isInputFocused.value = true
}

const handleBlur = () => {
    isInputFocused.value = false
}

// Funções para Password
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const handlePasswordInput = () => {
    emit('update:modelValue', passwordInputValue.value)
    emit('change', passwordInputValue.value)
}

const handlePasswordFocus = () => {
    isPasswordFocused.value = true
}

const handlePasswordBlur = () => {
    isPasswordFocused.value = false
}

// Funções para Date
const toggleDateCalendar = () => {
    isDateCalendarOpen.value = !isDateCalendarOpen.value
    if (isDateCalendarOpen.value) {
        if (dateInputValue.value) {
            const date = new Date(dateInputValue.value)
            if (!isNaN(date.getTime())) {
                calendarDate.value = new Date(date)
            }
        } else {
            calendarDate.value = new Date()
        }
    }
}

const previousMonth = () => {
    calendarDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
    calendarDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const selectDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    dateInputValue.value = `${year}-${month}-${day}`
    emit('update:modelValue', dateInputValue.value)
    emit('change', dateInputValue.value)
    isDateCalendarOpen.value = false
}

const handleDateFocus = () => {
    isDateFocused.value = true
}

const handleDateBlur = (event) => {
    setTimeout(() => {
        const relatedTarget = event.relatedTarget
        if (!dateWrapperRef.value?.contains(relatedTarget)) {
            isDateFocused.value = false
            isDateCalendarOpen.value = false
        }
    }, 150)
}

const setCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    dateInputValue.value = `${year}-${month}-${day}`
    emit('update:modelValue', dateInputValue.value)
    emit('change', dateInputValue.value)
    if (isDateCalendarOpen.value) {
        calendarDate.value = new Date(now)
    }
}

// Funções para Time
const toggleTimePicker = () => {
    isTimePickerOpen.value = !isTimePickerOpen.value
    if (isTimePickerOpen.value && timeInputValue.value) {
        const parts = timeInputValue.value.split(':')
        if (parts.length >= 2) {
            selectedHour.value = parseInt(parts[0], 10)
            selectedMinute.value = parseInt(parts[1], 10)
        }
    } else if (isTimePickerOpen.value) {
        selectedHour.value = null
        selectedMinute.value = null
    }
}

const selectHour = (hour) => {
    selectedHour.value = hour
    if (selectedMinute.value === null) {
        selectedMinute.value = 0
    }
    updateTimeValue()
}

const selectMinute = (minute) => {
    selectedMinute.value = minute
    if (selectedHour.value === null) {
        selectedHour.value = 0
    }
    updateTimeValue()
}

const updateTimeValue = () => {
    const hour = selectedHour.value !== null ? selectedHour.value : 0
    const minute = selectedMinute.value !== null ? selectedMinute.value : 0
    timeInputValue.value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    emit('update:modelValue', timeInputValue.value)
    emit('change', timeInputValue.value)
}

const handleTimeFocus = () => {
    isTimeFocused.value = true
}

const handleTimeBlur = (event) => {
    setTimeout(() => {
        const relatedTarget = event.relatedTarget
        if (!timeWrapperRef.value?.contains(relatedTarget)) {
            isTimeFocused.value = false
            isTimePickerOpen.value = false
        }
    }, 150)
}

const setCurrentTime = () => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    timeInputValue.value = `${hours}:${minutes}`
    emit('update:modelValue', timeInputValue.value)
    emit('change', timeInputValue.value)
    selectedHour.value = now.getHours()
    selectedMinute.value = now.getMinutes()
    if (isTimePickerOpen.value) {
        isTimePickerOpen.value = false
    }
}

// Funções para DateTime
const toggleDatetimePicker = () => {
    isDatetimePickerOpen.value = !isDatetimePickerOpen.value
    if (isDatetimePickerOpen.value) {
        if (datetimeInputValue.value) {
            const date = new Date(datetimeInputValue.value)
            if (!isNaN(date.getTime())) {
                datetimeCalendarDate.value = new Date(date)
                selectedDatetimeHour.value = date.getHours()
                selectedDatetimeMinute.value = date.getMinutes()
            }
        } else {
            const now = new Date()
            datetimeCalendarDate.value = new Date(now)
            selectedDatetimeHour.value = null
            selectedDatetimeMinute.value = null
        }
    }
}

const previousDatetimeMonth = () => {
    datetimeCalendarDate.value = new Date(datetimeYear.value, datetimeMonth.value - 1, 1)
}

const nextDatetimeMonth = () => {
    datetimeCalendarDate.value = new Date(datetimeYear.value, datetimeMonth.value + 1, 1)
}

const selectDatetimeDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    if (selectedDatetimeHour.value === null) {
        selectedDatetimeHour.value = 0
    }
    if (selectedDatetimeMinute.value === null) {
        selectedDatetimeMinute.value = 0
    }
    const hour = String(selectedDatetimeHour.value).padStart(2, '0')
    const minute = String(selectedDatetimeMinute.value).padStart(2, '0')
    datetimeInputValue.value = `${year}-${month}-${day}T${hour}:${minute}`
    emit('update:modelValue', datetimeInputValue.value)
    emit('change', datetimeInputValue.value)
    datetimeCalendarDate.value = new Date(date)
}

const selectDatetimeHour = (hour) => {
    selectedDatetimeHour.value = hour
    if (selectedDatetimeMinute.value === null) {
        selectedDatetimeMinute.value = 0
    }
    updateDatetimeValue()
}

const selectDatetimeMinute = (minute) => {
    selectedDatetimeMinute.value = minute
    if (selectedDatetimeHour.value === null) {
        selectedDatetimeHour.value = 0
    }
    updateDatetimeValue()
}

const updateDatetimeValue = () => {
    const hour = selectedDatetimeHour.value !== null ? selectedDatetimeHour.value : 0
    const minute = selectedDatetimeMinute.value !== null ? selectedDatetimeMinute.value : 0
    
    if (datetimeInputValue.value) {
        const date = new Date(datetimeInputValue.value)
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            datetimeInputValue.value = `${year}-${month}-${day}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        }
    } else {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        datetimeInputValue.value = `${year}-${month}-${day}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        datetimeCalendarDate.value = new Date(now)
    }
    emit('update:modelValue', datetimeInputValue.value)
    emit('change', datetimeInputValue.value)
}

const handleDatetimeFocus = () => {
    isDatetimeFocused.value = true
}

const handleDatetimeBlur = (event) => {
    setTimeout(() => {
        const relatedTarget = event.relatedTarget
        if (!datetimeWrapperRef.value?.contains(relatedTarget)) {
            isDatetimeFocused.value = false
            isDatetimePickerOpen.value = false
        }
    }, 150)
}

const setCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    datetimeInputValue.value = `${year}-${month}-${day}T${hours}:${minutes}`
    emit('update:modelValue', datetimeInputValue.value)
    emit('change', datetimeInputValue.value)
    datetimeCalendarDate.value = new Date(now)
    selectedDatetimeHour.value = now.getHours()
    selectedDatetimeMinute.value = now.getMinutes()
    if (isDatetimePickerOpen.value) {
        isDatetimePickerOpen.value = false
    }
}

// Funções para Select
const toggleSelectDropdown = () => {
    isSelectOpen.value = !isSelectOpen.value
    if (isSelectOpen.value) {
        isSelectFocused.value = true
        const selectedIndex = props.options.findIndex(opt => opt.value === selectValue.value)
        activeSelectIndex.value = selectedIndex >= 0 ? selectedIndex : 0
    } else {
        activeSelectIndex.value = -1
    }
}

const selectOption = (value) => {
    selectValue.value = value
    emit('update:modelValue', value)
    emit('change', value)
    isSelectOpen.value = false
    activeSelectIndex.value = -1
}

const handleSelectKeydown = (e) => {
    if (!isSelectOpen.value) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleSelectDropdown()
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            isSelectOpen.value = true
            const selectedIndex = props.options.findIndex(opt => opt.value === selectValue.value)
            activeSelectIndex.value = selectedIndex >= 0 ? selectedIndex : 0
        }
        return
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault()
        activeSelectIndex.value = Math.min(activeSelectIndex.value + 1, props.options.length - 1)
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        activeSelectIndex.value = Math.max(activeSelectIndex.value - 1, 0)
    } else if (e.key === 'Enter') {
        e.preventDefault()
        if (activeSelectIndex.value >= 0 && activeSelectIndex.value < props.options.length) {
            selectOption(props.options[activeSelectIndex.value].value)
        }
    } else if (e.key === 'Escape') {
        e.preventDefault()
        isSelectOpen.value = false
        activeSelectIndex.value = -1
        selectButtonRef.value?.blur()
    }
}

const handleSelectFocus = () => {
    isSelectFocused.value = true
}

const handleSelectBlur = (event) => {
    setTimeout(() => {
        const relatedTarget = event.relatedTarget
        if (!selectWrapperRef.value?.contains(relatedTarget)) {
            isSelectFocused.value = false
            isSelectOpen.value = false
        }
    }, 150)
}

// Funções para Autocomplete
const handleAutocompleteInput = () => {
    // Mantém o dropdown aberto se houver opções filtradas
    isAutocompleteOpen.value = filteredAutocompleteOptions.value.length > 0
    activeAutocompleteIndex.value = -1
    
    // Se o input está vazio, limpa o valor selecionado
    if (!autocompleteInputValue.value.trim()) {
        autocompleteValue.value = ''
        emit('update:modelValue', '')
        emit('change', '')
    } else {
        // Verifica se o texto digitado corresponde exatamente a uma opção (ignorando acentos)
        const exactMatch = props.options.find(opt => 
            normalizeString(opt.label) === normalizeString(autocompleteInputValue.value)
        )
        if (exactMatch) {
            autocompleteValue.value = exactMatch.value
            emit('update:modelValue', exactMatch.value)
            emit('change', exactMatch.value)
        } else {
            // Se não há correspondência exata, emite o texto digitado
            emit('update:modelValue', autocompleteInputValue.value)
            emit('change', autocompleteInputValue.value)
        }
    }
}

const selectAutocompleteOption = (value) => {
    const option = props.options.find(opt => opt.value === value)
    if (option) {
        autocompleteValue.value = value
        autocompleteInputValue.value = option.label
        emit('update:modelValue', value)
        emit('change', value)
        isAutocompleteOpen.value = false
        activeAutocompleteIndex.value = -1
    }
}

const handleAutocompleteKeydown = (e) => {
    if (!isAutocompleteOpen.value || filteredAutocompleteOptions.value.length === 0) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            if (filteredAutocompleteOptions.value.length > 0) {
                isAutocompleteOpen.value = true
                activeAutocompleteIndex.value = 0
            }
        }
        return
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault()
        activeAutocompleteIndex.value = Math.min(activeAutocompleteIndex.value + 1, filteredAutocompleteOptions.value.length - 1)
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        activeAutocompleteIndex.value = Math.max(activeAutocompleteIndex.value - 1, -1)
    } else if (e.key === 'Enter') {
        e.preventDefault()
        if (activeAutocompleteIndex.value >= 0 && activeAutocompleteIndex.value < filteredAutocompleteOptions.value.length) {
            selectAutocompleteOption(filteredAutocompleteOptions.value[activeAutocompleteIndex.value].value)
        }
    } else if (e.key === 'Escape') {
        e.preventDefault()
        isAutocompleteOpen.value = false
        activeAutocompleteIndex.value = -1
    }
}

const handleAutocompleteFocus = () => {
    isAutocompleteFocused.value = true
    // Abre o dropdown sempre que houver opções disponíveis
    if (filteredAutocompleteOptions.value.length > 0) {
        isAutocompleteOpen.value = true
    }
}

const handleAutocompleteBlur = (event) => {
    setTimeout(() => {
        const relatedTarget = event.relatedTarget
        if (!autocompleteWrapperRef.value?.contains(relatedTarget)) {
            isAutocompleteFocused.value = false
            isAutocompleteOpen.value = false
            activeAutocompleteIndex.value = -1
            
            // Se há um valor selecionado, atualiza o input com o label correspondente
            if (autocompleteValue.value) {
                const option = props.options.find(opt => opt.value === autocompleteValue.value)
                if (option) {
                    autocompleteInputValue.value = option.label
                }
            }
        }
    }, 150)
}

// Funções para Email
const handleEmailInput = () => {
    emit('update:modelValue', emailInputValue.value)
    emit('change', emailInputValue.value)
    showEmailSuggestions.value = emailSuggestions.value.length > 0
    activeSuggestionIndex.value = -1
}

const handleEmailKeydown = (e) => {
    if (!showEmailSuggestions.value || emailSuggestions.value.length === 0) return

    if (e.key === 'ArrowDown') {
        e.preventDefault()
        activeSuggestionIndex.value = Math.min(activeSuggestionIndex.value + 1, emailSuggestions.value.length - 1)
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        activeSuggestionIndex.value = Math.max(activeSuggestionIndex.value - 1, -1)
    } else if (e.key === 'Enter' && activeSuggestionIndex.value >= 0) {
        e.preventDefault()
        applyEmailSuggestion(emailSuggestions.value[activeSuggestionIndex.value])
    } else if (e.key === 'Escape') {
        showEmailSuggestions.value = false
        activeSuggestionIndex.value = -1
    }
}

const applyEmailSuggestion = (domain) => {
    const hasAt = emailInputValue.value.includes('@')
    const prefix = emailPrefix.value || emailInputValue.value || ''
    
    if (hasAt) {
        emailInputValue.value = `${prefix}@${domain}`
    } else {
        emailInputValue.value = `${prefix}@${domain}`
    }
    emit('update:modelValue', emailInputValue.value)
    emit('change', emailInputValue.value)
    showEmailSuggestions.value = false
    activeSuggestionIndex.value = -1
    nextTick(() => emailInputRef.value?.focus())
}

const handleEmailFocus = () => {
    isEmailFocused.value = true
    if (emailSuggestions.value.length > 0) {
        showEmailSuggestions.value = true
    }
}

const handleEmailBlur = (e) => {
    setTimeout(() => {
        if (!emailWrapperRef.value?.contains(e.relatedTarget)) {
            isEmailFocused.value = false
            showEmailSuggestions.value = false
            activeSuggestionIndex.value = -1
        }
    }, 150)
}

// Funções para Phone
const handlePhoneInput = (event) => {
    const inputValue = event.target.value
    
    // Remove tudo que não é número
    const numbers = getPhoneNumericValue(inputValue)
    
    // Limita a 11 dígitos (DDD + número)
    const limitedNumbers = numbers.slice(0, 11)
    
    // Atualiza o valor numérico
    phoneValue.value = limitedNumbers
    
    // Formata para exibição
    phoneDisplayValue.value = formatPhoneValue(limitedNumbers)
    
    // Emite o valor numérico
    emit('update:modelValue', phoneValue.value)
    emit('change', phoneValue.value)
}

const handlePhoneKeydown = (e) => {
    // Permite: backspace, delete, tab, escape, enter
    // e setas (esquerda, direita, cima, baixo)
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Permite: home, end, setas
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return
    }
    // Garante que é um número e bloqueia o resto
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault()
    }
}

const handlePhoneFocus = () => {
    isPhoneFocused.value = true
}

const handlePhoneBlur = () => {
    isPhoneFocused.value = false
    // Garante que o valor está formatado corretamente ao perder o foco
    if (phoneValue.value) {
        phoneDisplayValue.value = formatPhoneValue(phoneValue.value)
    }
}

// Funções para Money
const handleMoneyInput = (event) => {
    const inputValue = event.target.value
    
    // Remove tudo que não é número
    const numericValue = inputValue.replace(/\D/g, '')
    
    if (!numericValue) {
        moneyValue.value = ''
        moneyDisplayValue.value = ''
        emit('update:modelValue', '')
        emit('change', '')
        return
    }
    
    // Converte para número e divide por 100 para ter centavos
    const numberValue = parseInt(numericValue, 10) / 100
    
    // Atualiza o valor numérico
    moneyValue.value = numberValue.toFixed(2)
    
    // Formata para exibição
    moneyDisplayValue.value = formatMoneyValue(numberValue)
    
    // Emite o valor numérico como string
    emit('update:modelValue', moneyValue.value)
    emit('change', moneyValue.value)
}

const handleMoneyKeydown = (e) => {
    // Permite: backspace, delete, tab, escape, enter, ponto, vírgula
    // e setas (esquerda, direita, cima, baixo)
    if ([8, 9, 27, 13, 46, 110, 190, 188].indexOf(e.keyCode) !== -1 ||
        // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Permite: home, end, setas
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return
    }
    // Garante que é um número e bloqueia o resto
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault()
    }
}

const handleMoneyFocus = () => {
    isMoneyFocused.value = true
}

const handleMoneyBlur = () => {
    isMoneyFocused.value = false
    // Garante que o valor está formatado corretamente ao perder o foco
    if (moneyValue.value) {
        moneyDisplayValue.value = formatMoneyValue(moneyValue.value)
    }
}

// Funções para Number
const handleNumberInput = () => {
    emit('update:modelValue', numberInputValue.value)
    emit('change', numberInputValue.value)
}

const handleNumberFocus = () => {
    isNumberFocused.value = true
}

const handleNumberBlur = () => {
    isNumberFocused.value = false
}

const incrementNumber = () => {
    const currentValue = parseFloat(numberInputValue.value) || 0
    const step = 1
    numberInputValue.value = currentValue + step
    emit('update:modelValue', numberInputValue.value)
    emit('change', numberInputValue.value)
}

const decrementNumber = () => {
    const currentValue = parseFloat(numberInputValue.value) || 0
    const step = 1
    numberInputValue.value = currentValue - step
    emit('update:modelValue', numberInputValue.value)
    emit('change', numberInputValue.value)
}

// Funções para File
const triggerFileInput = () => {
    fileInputRef.value?.click()
}

const handleFileChange = (event) => {
    const files = event.target.files
    if (props.multiple) {
        const filesArray = Array.from(files || [])
        fileInputValue.value = filesArray
        emit('update:modelValue', filesArray)
        emit('change', filesArray)
    } else {
        const file = files?.[0] || null
        fileInputValue.value = file
        emit('update:modelValue', file)
        emit('change', file)
    }
}

const handleFileDragOver = (event) => {
    event.preventDefault()
    isFileDragging.value = true
    isFileFocused.value = true
}

const handleFileDragLeave = (event) => {
    event.preventDefault()
    // Só remove o dragging se realmente saiu do container
    const rect = fileWrapperRef.value?.getBoundingClientRect()
    if (rect) {
        const x = event.clientX
        const y = event.clientY
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            isFileDragging.value = false
        }
    }
}

const handleFileDrop = (event) => {
    event.preventDefault()
    isFileDragging.value = false
    
    const files = event.dataTransfer.files
    if (props.multiple) {
        const filesArray = Array.from(files || [])
        fileInputValue.value = filesArray
        emit('update:modelValue', filesArray)
        emit('change', filesArray)
    } else {
        const file = files?.[0] || null
        if (file) {
            fileInputValue.value = file
            emit('update:modelValue', file)
            emit('change', file)
        }
    }
}

const formatFileSize = (bytes) => {
    if (!bytes) return ''
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
}

const handleFileFocus = () => {
    isFileFocused.value = true
}

const handleFileBlur = () => {
    isFileFocused.value = false
    isFileDragging.value = false
}

const handleFileKeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        triggerFileInput()
    }
}

const removeFile = (index = null) => {
    if (props.multiple) {
        if (index !== null && Array.isArray(fileInputValue.value)) {
            const newFiles = fileInputValue.value.filter((_, i) => i !== index)
            fileInputValue.value = newFiles.length > 0 ? newFiles : null
            emit('update:modelValue', newFiles.length > 0 ? newFiles : null)
            emit('change', newFiles.length > 0 ? newFiles : null)
        } else {
            fileInputValue.value = null
            emit('update:modelValue', null)
            emit('change', null)
        }
    } else {
        fileInputValue.value = null
        emit('update:modelValue', null)
        emit('change', null)
    }
    if (fileInputRef.value) {
        fileInputRef.value.value = ''
    }
}

const handleClickOutside = (event) => {
    if (selectWrapperRef.value && !selectWrapperRef.value.contains(event.target)) {
        isSelectOpen.value = false
    }
    if (autocompleteWrapperRef.value && !autocompleteWrapperRef.value.contains(event.target)) {
        isAutocompleteOpen.value = false
    }
    if (dateWrapperRef.value && !dateWrapperRef.value.contains(event.target)) {
        isDateCalendarOpen.value = false
    }
    if (timeWrapperRef.value && !timeWrapperRef.value.contains(event.target)) {
        isTimePickerOpen.value = false
    }
    if (datetimeWrapperRef.value && !datetimeWrapperRef.value.contains(event.target)) {
        isDatetimePickerOpen.value = false
    }
    if (emailWrapperRef.value && !emailWrapperRef.value.contains(event.target)) {
        showEmailSuggestions.value = false
    }
}

// Watchers
watch(() => props.modelValue, (newValue) => {
    if (props.type === 'text') {
        inputValue.value = newValue || ''
    } else if (props.type === 'password') {
        passwordInputValue.value = newValue || ''
    } else if (props.type === 'date') {
        dateInputValue.value = newValue || ''
    } else if (props.type === 'time') {
        timeInputValue.value = newValue || ''
    } else if (props.type === 'datetime') {
        datetimeInputValue.value = newValue || ''
    } else if (props.type === 'select') {
        selectValue.value = newValue || ''
    } else if (props.type === 'autocomplete') {
        autocompleteValue.value = newValue || ''
        if (newValue) {
            const option = props.options.find(opt => opt.value === newValue)
            if (option) {
                autocompleteInputValue.value = option.label
            } else {
                autocompleteInputValue.value = newValue
            }
        } else {
            autocompleteInputValue.value = ''
        }
    } else if (props.type === 'email') {
        emailInputValue.value = newValue || ''
    } else if (props.type === 'number') {
        numberInputValue.value = newValue || ''
    } else if (props.type === 'money') {
        moneyValue.value = newValue || ''
        if (newValue) {
            moneyDisplayValue.value = formatMoneyValue(newValue)
        } else {
            moneyDisplayValue.value = ''
        }
    } else if (props.type === 'phone') {
        phoneValue.value = newValue || ''
        if (newValue) {
            phoneDisplayValue.value = formatPhoneValue(newValue)
        } else {
            phoneDisplayValue.value = ''
        }
    } else if (props.type === 'file') {
        if (props.multiple) {
            fileInputValue.value = Array.isArray(newValue) ? newValue : (newValue ? [newValue] : null)
        } else {
            fileInputValue.value = newValue || null
        }
    }
})

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    
    // Inicializa o valor monetário se houver modelValue
    if (props.type === 'money' && props.modelValue) {
        moneyValue.value = props.modelValue
        moneyDisplayValue.value = formatMoneyValue(props.modelValue)
    }
    
    // Inicializa o valor do telefone se houver modelValue
    if (props.type === 'phone' && props.modelValue) {
        phoneValue.value = props.modelValue
        phoneDisplayValue.value = formatPhoneValue(props.modelValue)
    }
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Estilos compartilhados - copiados do design-lab.vue */
.input-wrapper {
    position: relative;
    display: inline-flex;
    width: fit-content;
    padding-top: 12px;
}

.input-wrapper--full-width {
    display: flex;
    width: 100%;
}

.input {
    position: relative;
    width: 320px;
    padding: 12px 18px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background-color: rgba(4, 4, 4, 0.75);
    background-size: 6px 6px;
    backdrop-filter: blur(5px);
    color: #f5f5f5;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 0.5px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    outline: none;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
    box-sizing: border-box;
    height: calc(1.4em + 24px);
}

.input-label {
    position: absolute;
    top: calc(50% + 6px);
    left: 18px;
    transform: translateY(-50%);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
    color: rgba(255, 255, 255, 0.65);
    pointer-events: none;
    transition: top 0.2s ease, left 0.2s ease, transform 0.2s ease, font-size 0.2s ease,
        color 0.2s ease, opacity 0.2s ease;
    opacity: 0.75;
    z-index: 2;
}

.input-wrapper--active .input-label {
    top: 8px;
    left: 0;
    transform: translateY(-100%);
    font-size: 11px;
    opacity: 1;
    color: rgba(245, 245, 245, 0.85);
}

.input::placeholder {
    color: rgba(245, 245, 245, 0.55);
    letter-spacing: 0.3px;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.input-wrapper--active .input::placeholder {
    opacity: 1;
}

.input-wrapper--full-width .input {
    width: 100%;
}

.input:focus {
    border-color: rgba(255, 255, 255, 0.35);
    background-color: rgba(12, 12, 12, 0.85);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.input:focus-visible {
    outline: none;
}

.input-wrapper--password {
    position: relative;
}

.input--password {
    padding-right: 50px;
}

.password-toggle-button {
    position: absolute;
    top: calc(14px + 0.7em + 12px);
    right: 12px;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(245, 245, 245, 0.65);
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
    z-index: 3;
    outline: none;
}

.password-toggle-button:hover {
    color: rgba(245, 245, 245, 0.85);
}

.password-toggle-button:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
}

.password-toggle-button i {
    font-size: 18px;
    line-height: 1;
}

.input-wrapper--password.input-wrapper--focused .password-toggle-button {
    color: rgba(245, 245, 245, 0.85);
}

.input-wrapper--date,
.input-wrapper--time,
.input-wrapper--datetime {
    position: relative;
}

.input--date,
.input--time,
.input--datetime {
    padding-right: 80px;
}

.input--datetime {
    padding-right: 12px;
}

.datetime-now-button {
    position: absolute;
    top: calc(14px + 0.7em + 12px);
    right: 12px;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(245, 245, 245, 0.65);
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
    z-index: 3;
    outline: none;
}

.datetime-now-button:hover {
    color: rgba(245, 245, 245, 0.85);
}

.datetime-now-button:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
}

.datetime-now-button i {
    font-size: 18px;
    line-height: 1;
}

.input-wrapper--date.input-wrapper--focused .datetime-now-button,
.input-wrapper--time.input-wrapper--focused .datetime-now-button,
.input-wrapper--datetime.input-wrapper--focused .datetime-now-button {
    color: rgba(245, 245, 245, 0.85);
}

.input--date,
.input--time,
.input--datetime {
    cursor: pointer;
}

.date-calendar-dropdown {
    position: absolute;
    left: 0;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background-color: rgba(4, 4, 4, 0.95);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.date-calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.date-calendar-nav-button {
    background: none;
    border: none;
    color: rgba(245, 245, 245, 0.65);
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, background-color 0.2s ease;
    outline: none;
}

.date-calendar-nav-button:hover {
    color: rgba(245, 245, 245, 0.85);
    background-color: rgba(255, 255, 255, 0.1);
}

.date-calendar-nav-button:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
}

.date-calendar-nav-button i {
    font-size: 18px;
    line-height: 1;
}

.date-calendar-month-year {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    flex: 1;
}

.date-calendar-month {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
    color: rgba(245, 245, 245, 0.85);
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
}

.date-calendar-year {
    font-size: 12px;
    letter-spacing: 0.3px;
    color: rgba(245, 245, 245, 0.65);
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
}

.date-calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
}

.date-calendar-weekday {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: rgba(245, 245, 245, 0.5);
    text-align: center;
    padding: 4px;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
}

.date-calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
}

.date-calendar-day {
    background: none;
    border: none;
    color: rgba(245, 245, 245, 0.85);
    cursor: pointer;
    padding: 8px;
    font-size: 14px;
    line-height: 1.4;
    letter-spacing: 0.3px;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-align: center;
    transition: background-color 0.2s ease, color 0.2s ease;
    outline: none;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.date-calendar-day:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(245, 245, 245, 1);
}

.date-calendar-day:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
}

.date-calendar-day--other-month {
    color: rgba(245, 245, 245, 0.35);
}

.date-calendar-day--other-month:hover {
    color: rgba(245, 245, 245, 0.65);
}

.date-calendar-day--today {
    font-weight: 600;
    color: rgba(245, 245, 245, 1);
}

.date-calendar-day--selected {
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(245, 245, 245, 1);
    font-weight: 600;
}

.date-calendar-day--selected:hover {
    background-color: rgba(255, 255, 255, 0.25);
}

.time-picker-dropdown {
    position: absolute;
    left: 0;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background-color: rgba(4, 4, 4, 0.95);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    padding: 16px;
}

.time-picker-container {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.time-picker-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.time-picker-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: rgba(245, 245, 245, 0.65);
    text-align: center;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
}

.time-picker-scroll {
    max-height: 200px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 4px 0;
}

.time-picker-scroll::-webkit-scrollbar {
    width: 6px;
}

.time-picker-scroll::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
}

.time-picker-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
}

.time-picker-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

.time-picker-option {
    background: none;
    border: none;
    color: rgba(245, 245, 245, 0.85);
    cursor: pointer;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 1.4;
    letter-spacing: 0.3px;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-align: center;
    transition: background-color 0.2s ease, color 0.2s ease;
    outline: none;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.time-picker-option:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(245, 245, 245, 1);
}

.time-picker-option:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
}

.time-picker-option--selected {
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(245, 245, 245, 1);
    font-weight: 600;
}

.time-picker-option--selected:hover {
    background-color: rgba(255, 255, 255, 0.25);
}

.time-picker-separator {
    font-size: 24px;
    font-weight: 600;
    color: rgba(245, 245, 245, 0.85);
    display: flex;
    align-items: center;
    padding-top: 28px;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
}

.datetime-picker-dropdown {
    position: absolute;
    left: 0;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background-color: rgba(4, 4, 4, 0.95);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.datetime-picker-date-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.datetime-picker-time-section {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 16px;
}

.select-wrapper {
    position: relative;
    display: inline-flex;
    width: fit-content;
    padding-top: 12px;
}

.select-wrapper--full-width {
    display: flex;
    width: 100%;
}

.select-button {
    position: relative;
    width: 320px;
    padding: 12px 40px 12px 18px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background-color: rgba(4, 4, 4, 0.75);
    background-size: 6px 6px;
    backdrop-filter: blur(5px);
    color: #f5f5f5;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 0.5px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    outline: none;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
    cursor: pointer;
    text-align: left;
    box-sizing: border-box;
    height: calc(1.4em + 24px);
}

.select-button-text {
    display: block;
    width: 100%;
}

.select-button-text--placeholder {
    color: rgba(245, 245, 245, 0.55);
    letter-spacing: 0.3px;
}

.select-label {
    position: absolute;
    top: calc(50% + 6px);
    left: 18px;
    transform: translateY(-50%);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
    color: rgba(255, 255, 255, 0.65);
    pointer-events: none;
    transition: top 0.2s ease, left 0.2s ease, transform 0.2s ease, font-size 0.2s ease,
        color 0.2s ease, opacity 0.2s ease;
    opacity: 0.75;
    z-index: 2;
}

.select-wrapper--active .select-label {
    top: 8px;
    left: 0;
    transform: translateY(-100%);
    font-size: 11px;
    opacity: 1;
    color: rgba(245, 245, 245, 0.85);
}

.select-button:focus {
    border-color: rgba(255, 255, 255, 0.35);
    background-color: rgba(12, 12, 12, 0.85);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.select-button:focus-visible {
    outline: none;
}

.select-wrapper--full-width .select-button {
    width: 100%;
}

.select-arrow {
    position: absolute;
    top: calc(11px + 0.7em + 12px);
    right: 20px;
    transform: translateY(-50%);
    color: rgba(245, 245, 245, 0.65);
    font-size: 18px;
    pointer-events: none;
    transition: color 0.2s ease, transform 0.2s ease;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.select-wrapper--focused .select-arrow,
.select-wrapper--open .select-arrow {
    color: rgba(245, 245, 245, 0.85);
}

.select-wrapper--open .select-arrow {
    transform: translateY(-50%) rotate(180deg);
}

.select-dropdown {
    position: absolute;
    left: 0;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background-color: rgba(4, 4, 4, 0.95);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.select-option {
    width: 100%;
    padding: 12px 18px;
    border: none;
    background-color: transparent;
    color: #f5f5f5;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 0.5px;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    outline: none;
}

.select-option:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.select-option:focus {
    background-color: rgba(255, 255, 255, 0.15);
}

.select-option--selected {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(245, 245, 245, 1);
}

.select-option--selected:hover {
    background-color: rgba(255, 255, 255, 0.15);
}

.select-option--active {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(245, 245, 245, 1);
}

.select-option--active:hover {
    background-color: rgba(255, 255, 255, 0.15);
}

.input-wrapper--email {
    position: relative;
}

.input--email {
    text-transform: none;
}

.email-suggestions {
    position: absolute;
    left: 0;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background-color: rgba(4, 4, 4, 0.95);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.email-suggestion {
    width: 100%;
    padding: 12px 18px;
    border: none;
    background-color: transparent;
    color: #f5f5f5;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 0.5px;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    outline: none;
}

.email-suggestion:hover,
.email-suggestion--active {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(245, 245, 245, 1);
}

.email-suggestion:focus {
    background-color: rgba(255, 255, 255, 0.15);
}

.email-suggestions::-webkit-scrollbar {
    width: 6px;
}

.email-suggestions::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
}

.email-suggestions::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
}

.email-suggestions::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

.autocomplete-wrapper {
    position: relative;
    display: inline-flex;
    width: fit-content;
    padding-top: 12px;
}

.autocomplete-wrapper--full-width {
    display: flex;
    width: 100%;
}

.autocomplete-input {
    position: relative;
    width: 320px;
    padding: 12px 40px 12px 18px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background-color: rgba(4, 4, 4, 0.75);
    background-size: 6px 6px;
    backdrop-filter: blur(5px);
    color: #f5f5f5;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 0.5px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    outline: none;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
    box-sizing: border-box;
    height: calc(1.4em + 24px);
}

.autocomplete-label {
    position: absolute;
    top: calc(50% + 6px);
    left: 18px;
    transform: translateY(-50%);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
    color: rgba(255, 255, 255, 0.65);
    pointer-events: none;
    transition: top 0.2s ease, left 0.2s ease, transform 0.2s ease, font-size 0.2s ease,
        color 0.2s ease, opacity 0.2s ease;
    opacity: 0.75;
    z-index: 2;
}

.autocomplete-wrapper--active .autocomplete-label {
    top: 8px;
    left: 0;
    transform: translateY(-100%);
    font-size: 11px;
    opacity: 1;
    color: rgba(245, 245, 245, 0.85);
}

.autocomplete-input::placeholder {
    color: rgba(245, 245, 245, 0.55);
    letter-spacing: 0.3px;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.autocomplete-wrapper--active .autocomplete-input::placeholder {
    opacity: 1;
}

.autocomplete-wrapper--full-width .autocomplete-input {
    width: 100%;
}

.autocomplete-input:focus {
    border-color: rgba(255, 255, 255, 0.35);
    background-color: rgba(12, 12, 12, 0.85);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.autocomplete-input:focus-visible {
    outline: none;
}

.autocomplete-arrow {
    position: absolute;
    top: calc(11px + 0.7em + 12px);
    right: 20px;
    transform: translateY(-50%);
    color: rgba(245, 245, 245, 0.65);
    font-size: 18px;
    pointer-events: none;
    transition: color 0.2s ease, transform 0.2s ease;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.autocomplete-wrapper--focused .autocomplete-arrow,
.autocomplete-wrapper--open .autocomplete-arrow {
    color: rgba(245, 245, 245, 0.85);
}

.autocomplete-wrapper--open .autocomplete-arrow {
    transform: translateY(-50%) rotate(180deg);
}

.autocomplete-dropdown {
    position: absolute;
    left: 0;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background-color: rgba(4, 4, 4, 0.95);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.autocomplete-option {
    width: 100%;
    padding: 12px 18px;
    border: none;
    background-color: transparent;
    color: #f5f5f5;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 0.5px;
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    outline: none;
}

.autocomplete-option:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.autocomplete-option:focus {
    background-color: rgba(255, 255, 255, 0.15);
}

.autocomplete-option--selected {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(245, 245, 245, 1);
}

.autocomplete-option--selected:hover {
    background-color: rgba(255, 255, 255, 0.15);
}

.autocomplete-option--active {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(245, 245, 245, 1);
}

.autocomplete-option--active:hover {
    background-color: rgba(255, 255, 255, 0.15);
}

.autocomplete-dropdown::-webkit-scrollbar {
    width: 6px;
}

.autocomplete-dropdown::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
}

.autocomplete-dropdown::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
}

.autocomplete-dropdown::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

.input-wrapper--number {
    position: relative;
}

.input--number {
    text-transform: none;
    padding-right: 80px;
    -moz-appearance: textfield;
    appearance: textfield;
}

.input--number::-webkit-outer-spin-button,
.input--number::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.number-controls {
    position: absolute;
    top: calc(14px + 0.7em + 11px);
    right: 12px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 3;
}

.number-control-button {
    background: none;
    border: none;
    color: rgba(245, 245, 245, 0.65);
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, background-color 0.2s ease, transform 0.1s ease;
    outline: none;
}

.number-control-button:hover {
    color: rgba(245, 245, 245, 0.85);
    background-color: rgba(255, 255, 255, 0.1);
}

.number-control-button:active {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(0.95);
    color: rgba(245, 245, 245, 1);
}

.number-control-button:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
}

.number-control-button i {
    font-size: 18px;
    line-height: 1;
}

.input-wrapper--number.input-wrapper--focused .number-control-button {
    color: rgba(245, 245, 245, 0.85);
}

.input-wrapper--file {
    position: relative;
}

.file-input-container {
    position: relative;
    width: 100%;
    min-width: 400px;
}

.file-input-hidden {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
}

.file-input-display {
    position: relative;
    width: 100%;
    min-height: 200px;
    padding: 40px 24px;
    border: 2px dashed rgba(255, 255, 255, 0.35);
    background-color: rgba(4, 4, 4, 0.75);
    backdrop-filter: blur(5px);
    color: #f5f5f5;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    box-sizing: border-box;
}

.file-input-container--dragging .file-input-display {
    border-color: rgba(255, 255, 255, 0.6);
    background-color: rgba(12, 12, 12, 0.85);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}

.input-wrapper--file.input-wrapper--focused .file-input-display {
    border-color: rgba(255, 255, 255, 0.5);
    background-color: rgba(12, 12, 12, 0.85);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.file-input-display:hover {
    border-color: rgba(255, 255, 255, 0.5);
    background-color: rgba(12, 12, 12, 0.8);
}

.file-input-display:focus {
    outline: none;
}

.file-input-display:focus-visible {
    border-color: rgba(255, 255, 255, 0.5);
    background-color: rgba(12, 12, 12, 0.85);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.file-input-icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.file-input-icon {
    font-size: 48px;
    color: rgba(245, 245, 245, 0.65);
    transition: color 0.2s ease, transform 0.2s ease;
}

.input-wrapper--file.input-wrapper--focused .file-input-icon,
.file-input-container--dragging .file-input-icon {
    color: rgba(245, 245, 245, 0.85);
    transform: scale(1.05);
}

.file-input-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
}

.file-input-text {
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 0.5px;
    color: rgba(245, 245, 245, 0.75);
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
    transition: color 0.2s ease;
}

.file-input-text--has-file {
    color: rgba(245, 245, 245, 0.95);
    font-weight: 500;
    text-transform: none;
}

.file-input-size {
    font-size: 12px;
    line-height: 1.4;
    letter-spacing: 0.3px;
    color: rgba(245, 245, 245, 0.55);
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
}

.file-input-display--multiple .file-input-content {
    width: 100%;
    align-items: flex-start;
    text-align: left;
    gap: 12px;
}

.file-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 4px;
}

.file-list::-webkit-scrollbar {
    width: 6px;
}

.file-list::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
}

.file-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
}

.file-list::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

.file-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

.file-item:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
}

.file-item-name {
    flex: 1;
    font-size: 14px;
    line-height: 1.4;
    letter-spacing: 0.3px;
    color: rgba(245, 245, 245, 0.9);
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.file-item-size {
    font-size: 12px;
    line-height: 1.4;
    letter-spacing: 0.3px;
    color: rgba(245, 245, 245, 0.55);
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
    white-space: nowrap;
}

.file-item-remove {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(245, 245, 245, 0.75);
    cursor: pointer;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
    outline: none;
    min-width: 24px;
    height: 24px;
}

.file-item-remove:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: rgba(245, 245, 245, 0.95);
}

.file-item-remove:active {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(0.95);
}

.file-item-remove:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
}

.file-item-remove i {
    font-size: 14px;
    line-height: 1;
}

.file-input-text--count {
    font-size: 12px;
    letter-spacing: 0.3px;
    color: rgba(245, 245, 245, 0.65);
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
}

.input-wrapper--file .input-label {
    top: 8px;
    left: 0;
    transform: translateY(-100%);
    font-size: 11px;
    opacity: 1;
    color: rgba(245, 245, 245, 0.85);
}

.file-remove-button {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(245, 245, 245, 0.75);
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
    outline: none;
    z-index: 10;
    width: 32px;
    height: 32px;
}

.file-remove-button:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: rgba(245, 245, 245, 0.95);
}

.file-remove-button:active {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(0.95);
}

.file-remove-button:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
}

.file-remove-button i {
    font-size: 18px;
    line-height: 1;
}

.input-wrapper--money {
    position: relative;
}

.money-input-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
}

.money-currency-label {
    position: absolute;
    left: 18px;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 0.5px;
    color: rgba(245, 245, 245, 0.65);
    font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
    text-transform: uppercase;
    pointer-events: none;
    z-index: 2;
    transition: color 0.2s ease;
}

.input-wrapper--money.input-wrapper--focused .money-currency-label {
    color: rgba(245, 245, 245, 0.85);
}

.input--money {
    text-transform: none;
    text-align: left;
}

.input-wrapper--phone {
    position: relative;
}

.input--phone {
    text-transform: none;
    letter-spacing: 0.3px;
}

</style>