var edx = edx || {};

(function($, _, Backbone, gettext) {
    'use strict';

    edx.student = edx.student || {};
    edx.student.account = edx.student.account || {};
    edx.student.account.settingsViews = edx.student.account.settingsViews || {};

    edx.student.account.settingsViews.AccountSettingsView = Backbone.View.extend({

        template: _.template($('#account_settings-tpl').text()),

        events: {
        },

        initialize: function(options) {
            _.bindAll(this, 'render', 'setup_fields');
        },

        model_value: function() {
            return this.model.get(this.options.value_attribute);
        },

        render: function() {
            this.$el.html(this.template({
                sections: this.options.sections,
            }));
            return this;
        },

        setup_fields: function() {
            this.$('.ui-loading-anim').addClass('is-hidden');

            var view = this;
            _.each(this.$('.account-settings-section-body'), function(section_el, index) {
                _.each(view.options.sections[index].fields, function(field, index) {
                    $(section_el).append(field.view.render().el);
                });
            });
            return this;
        },
    });

    edx.student.account.settingsViews.FieldView = Backbone.View.extend({

        className: function(){
            return "account-settings-field " + this.options.value_attribute;
        },
        tagName: "div",

        initialize: function(options) {
            _.bindAll(this, 'model_value');
        },

        model_value: function() {
            return this.model.get(this.options.value_attribute);
        }

    });

    edx.student.account.settingsViews.ReadonlyFieldView = edx.student.account.settingsViews.FieldView.extend({

        template: _.template($('#field_readonly-tpl').text()),

        events: {

        },

        initialize: function(options) {
            _.bindAll(this, 'render', 'update_value');
            this.listenTo(this.model, "change:" + this.options.value_attribute, this.update_value);
        },

        render: function() {
            this.$el.html(this.template({
                title: this.options.title,
                value: this.model_value(),
                message: this.options.message,
            }));
            return this;
        },

        update_value: function() {
            this.$('.account-settings-field-value').html(this.model_value());
        },
    });

    edx.student.account.settingsViews.TextFieldView = edx.student.account.settingsViews.FieldView.extend({

        template: _.template($('#field_text-tpl').text()),

        events: {

        },

        initialize: function(options) {
            _.bindAll(this, 'render', 'update_value');
            this.listenTo(this.model, "change:" + this.options.value_attribute, this.update_value);
        },

        render: function() {
            this.$el.html(this.template({
                title: this.options.title,
                value: this.model_value(),
                message: this.options.message,
            }));
            return this;
        },

        update_value: function() {
            this.$('.account-settings-field-value input').val(this.model_value());
        },
    });

    edx.student.account.settingsViews.LinkFieldView = edx.student.account.settingsViews.FieldView.extend({

        template: _.template($('#field_link-tpl').text()),

        events: {

        },

        initialize: function(options) {
            _.bindAll(this, 'render', 'update_value');
            this.listenTo(this.model, "change", this.update_value);
        },

        render: function() {
            this.$el.html(this.template({
                title: this.options.title,
                link_title: this.options.link_title,
                link_href: this.options.link_href,
                message: this.options.message,
            }));
            return this;
        },

        update_value: function() {
        },
    });

    edx.student.account.settingsViews.DropdownFieldView = edx.student.account.settingsViews.FieldView.extend({

        template: _.template($('#field_dropdown-tpl').text()),

        events: {

        },

        initialize: function(options) {
            _.bindAll(this, 'render', 'update_value');
            this.listenTo(this.model, "change:" + this.options.value_attribute, this.update_value);
        },

        render: function() {
            this.$el.html(this.template({
                title: this.options.title,
                required: this.options.required,
                select_options: this.options.options,
                message: this.options.message,
            }));
            this.update_value()
            return this;
        },

        update_value: function() {
            var value;
            if (this.options.required) {
                value = this.model_value() || this.options.default_value;
            } else {
                value = this.model_value() || "";
            }
            this.$(".account-settings-field-value select").val((value));
        },
    });

}).call(this, $, _, Backbone, gettext);