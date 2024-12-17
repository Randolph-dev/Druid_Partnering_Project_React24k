import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";

// this ID comes from Mautic form components ID
const formId = {
  Feedback: 8,
  Client: 5,
  Partner: 6,
  "Job Seeker": 7,
};

type FormType = keyof typeof formId;

export default function ContactForm() {
  const [currentFormType, setCurrentFormType] = useState<FormType>("Feedback");

  return (
    <Container fluid className="py-5 d-flex flex-column align-items-center">
      <h2 className="my-5">Send us a message</h2>
      <Container fluid className="d-flex justify-content-center gap-2">
        {Object.keys(formId).map((type) => (
          <Button
            key={type}
            variant="outline-danger"
            onClick={() => setCurrentFormType(type as FormType)}
            active={currentFormType === type}
          >
            {type}
          </Button>
        ))}
      </Container>

      {/* iframe not used anymore becaused of hard to style */}
      {/* <iframe
        src={`//mautic.alextran.cloud/form/${formId[currentFormType]}`}
        width="100%"
        height="100%"
        style={{ padding: '2rem' }}
      >
        <p>Please use a different browser to use the form</p>
      </iframe> */}

      {/*
      this form comes from the self hosted option of Mautic Form HTML. 
      I paste it here, add the dynamic id and add some bootstrap Components/styling to it
      */}
      <Container
        fluid
        id="mauticform_wrapper_contactformclient"
        className="mauticform_wrapper"
        style={{ maxWidth: "500px", padding: "1rem" }}
      >
        <Form
          autoComplete="false"
          role="form"
          method="post"
          action={`http://mautic.alextran.cloud/form/submit?formId=${formId[currentFormType]}`}
          id="mauticform_contactformclient"
          data-mautic-form="contactformclient"
          encType="multipart/form-data"
        >
          <div
            className="mauticform-error"
            id="mauticform_contactformclient_error"
          ></div>
          <div
            className="mauticform-message"
            id="mauticform_contactformclient_message"
          ></div>
          <div className="mauticform-innerform">
            <Container
              className="mauticform-page-wrapper mauticform-page-1"
              data-mautic-form-page="1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div className="d-flex gap-3">
                <Form.Group
                  id="mauticform_contactformclient_first_name"
                  className="w-50"
                >
                  <Form.Label
                    htmlFor="mauticform_input_contactformclient_first_name"
                    className="mauticform-label"
                  >
                    First name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="mauticform[first_name]"
                    id="mauticform_input_contactformclient_first_name"
                    className="mauticform-input"
                  />
                </Form.Group>

                <Form.Group
                  id="mauticform_contactformclient_last_name"
                  className="w-50"
                >
                  <Form.Label
                    htmlFor="mauticform_input_contactformclient_last_name"
                    className="mauticform-label"
                  >
                    Last name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="mauticform[last_name]"
                    id="mauticform_input_contactformclient_last_name"
                    className="mauticform-input"
                  />
                </Form.Group>
              </div>

              <Form.Group
                id="mauticform_contactformclient_email"
                className="mauticform-row mauticform-email mauticform-field-3 mauticform-required"
                data-validate="email"
                data-validation-type="email"
              >
                <Form.Label
                  id="mauticform_label_contactformclient_email"
                  htmlFor="mauticform_input_contactformclient_email"
                  className="mauticform-label"
                >
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="mauticform[email]"
                  id="mauticform_input_contactformclient_email"
                  className="mauticform-input"
                />
                <span
                  className="mauticform-errormsg"
                  style={{ display: "none" }}
                >
                  Wrong format!
                </span>
              </Form.Group>

              <Form.Group
                id="mauticform_contactformclient_phone_number"
                className="mauticform-row mauticform-tel mauticform-field-4"
              >
                <Form.Label
                  id="mauticform_label_contactformclient_phone_number"
                  htmlFor="mauticform_input_contactformclient_phone_number"
                  className="mauticform-label"
                >
                  Phone number
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="mauticform[phone_number]"
                  id="mauticform_input_contactformclient_phone_number"
                  className="mauticform-input"
                />
                <span
                  className="mauticform-errormsg"
                  style={{ display: "none" }}
                ></span>
              </Form.Group>

              <Form.Group
                id="mauticform_contactformclient_f_message"
                className="mauticform-row mauticform-text mauticform-field-5"
              >
                <Form.Label
                  id="mauticform_label_contactformclient_f_message"
                  htmlFor="mauticform_input_contactformclient_f_message"
                  className="mauticform-label"
                >
                  Message
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="mauticform[f_message]"
                  id="mauticform_input_contactformclient_f_message"
                  className="mauticform-textarea"
                />
                <span
                  className="mauticform-errormsg"
                  style={{ display: "none" }}
                ></span>
              </Form.Group>

              <Form.Group
                id="mauticform_contactformclient_submit"
                className="mauticform-row mauticform-button-wrapper mauticform-field-6"
              >
                <Button
                  className="btn btn-default mauticform-button"
                  name="mauticform[submit]"
                  value="1"
                  id="mauticform_input_contactformclient_submit"
                  type="submit"
                  variant="danger"
                >
                  Submit
                </Button>
              </Form.Group>
            </Container>
          </div>
          <input
            type="hidden"
            name="mauticform[formId]"
            id="mauticform_contactformclient_id"
            value={formId[currentFormType]}
          />
          <input
            type="hidden"
            name="mauticform[return]"
            id="mauticform_contactformclient_return"
          />
          <input
            type="hidden"
            name="mauticform[formName]"
            id="mauticform_contactformclient_name"
            value="contactformclient"
          />
        </Form>
      </Container>
    </Container>
  );
}
