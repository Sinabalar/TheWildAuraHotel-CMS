import {useForm} from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useSignup} from "./useSignup.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {

    const {register, formState, getValues, handleSubmit, reset} = useForm();
    const {errors} = formState;
    const {signup, isSigningUp} = useSignup();

    function onSubmit({fullName, email, password}) {
        signup({fullName, email, password}, {
            onSettled: () => reset,
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isSigningUp}
                    {...register("fullName", {
                        required: "This field is required"
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors}>
                <Input
                    type="email"
                    id="email"
                    disabled={isSigningUp}
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "please provide a valid email address"
                        }
                    })}
                />
            </FormRow>

            <FormRow label="Password (min 8 characters)" error={errors}>
                <Input
                    type="password"
                    id="password"
                    disabled={isSigningUp}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "password needs to have minimum of 8 characters"
                        }
                    })}
                />
            </FormRow>

            <FormRow label="Repeat password" error={errors}>
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isSigningUp}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) => value === getValues().password || "password need to match"
                    })}
                />
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>{isSigningUp ? <SpinnerMini/> : "Create new user"}</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
