import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckIcon from '@mui/icons-material/Check';
import PaymentIcon from '@mui/icons-material/Payment';

const CheckoutStepper = (props) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <CheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <PaymentIcon />
        }
    ];

    return (
        <>
            <Box sx={{ width: '100%', margin: '15px 0px' }}>
                <Stepper activeStep={props.activeStep} alternativeLabel>
                    {steps.map((item, index) => (
                        <Step key={index} active={props.activeStep === index ? true : false}
                            completed={props.activeStep >= index ? true : false}>
                            <StepLabel style={{
                                color: props.activeStep >= index ? 'tomato' : "rgba(0, 0, 0, 0.649)"
                            }} icon={item.icon}>{item.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </>
    )
};

export default CheckoutStepper;
