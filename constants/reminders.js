const emailTemplates = [
  {
    label: "7 days before reminder",
    subject:
      "📅 Reminder: Your {subscriptionName} Subscription Renews in 7 Days!",
    body: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #4a90e2; text-align: center;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800;">SubDub</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">                
                <p style="font-size: 16px; margin-bottom: 25px;">Hello <strong style="color: #4a90e2;">{userName}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Your <strong>{subscriptionName}</strong> subscription is set to renew on <strong style="color: #4a90e2;">{renewalDate}</strong> (7 days from today).</p>
                
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">🏆</span>
                            <strong>Plan:</strong> {planName}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">💰</span>
                            <strong>Price:</strong> {price}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">💳</span>
                            <strong>Payment Method:</strong> {paymentMethod}
                        </td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; margin-bottom: 25px;">If you'd like to make changes or cancel your subscription, please visit your <a href="{accountSettingsLink}" style="color: #4a90e2; text-decoration: none;">account settings</a> before the renewal date.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">Need help? <a href="{supportLink}" style="color: #4a90e2; text-decoration: none;">Contact our support team</a> anytime.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Best regards,<br>
                    <strong>The SubDub Team</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0 0 10px;">
                    SubDub Inc. | 123 Main St, Anytown, AN 12345
                </p>
                <p style="margin: 0;">
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                </p>
            </td>
        </tr>
    </table>
</div>
    `,
  },
  {
    label: "5 days before reminder",
    subject: "⏳ {subscriptionName} Renews in 5 Days – Stay Subscribed!",
    body: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #4a90e2; text-align: center;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800;">SubDub</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">                
                <p style="font-size: 16px; margin-bottom: 25px;">Hey <strong style="color: #4a90e2;">{userName}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Just a reminder that your <strong>{subscriptionName}</strong> subscription renews on <strong style="color: #4a90e2;">{renewalDate}</strong> (5 days from today).</p>
                
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">🏆</span>
                            <strong>Plan:</strong> {planName}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">💰</span>
                            <strong>Price:</strong> {price}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">💳</span>
                            <strong>Payment Method:</strong> {paymentMethod}
                        </td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; margin-bottom: 25px;">No action is needed if you wish to continue. To update your details, visit your <a href="{accountPageLink}" style="color: #4a90e2; text-decoration: none;">account page</a>.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Cheers,<br>
                    <strong>The SubDub Team</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0 0 10px;">
                    SubDub Inc. | 123 Main St, Anytown, AN 12345
                </p>
                <p style="margin: 0;">
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                </p>
            </td>
        </tr>
    </table>
</div>
    `,
  },
  {
    label: "2 days before reminder",
    subject: "🚀 2 Days Left! {subscriptionName} Subscription Renewal",
    body: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #4a90e2; text-align: center;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800;">SubDub</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">                
                <p style="font-size: 16px; margin-bottom: 25px;">Hi <strong style="color: #4a90e2;">{userName}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Your <strong>{subscriptionName}</strong> subscription renewal is just <strong>2 days away</strong> on <strong style="color: #4a90e2;">{renewalDate}</strong>.</p>
                
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">🏆</span>
                            <strong>Plan:</strong> {planName}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">💰</span>
                            <strong>Price:</strong> {price}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">💳</span>
                            <strong>Payment Method:</strong> {paymentMethod}
                        </td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Make sure your payment details are up to date to avoid any service interruptions.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">Have questions? <a href="{supportLink}" style="color: #4a90e2; text-decoration: none;">We're here to help</a>.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Best regards,<br>
                    <strong>The SubDub Team</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0 0 10px;">
                    SubDub Inc. | 123 Main St, Anytown, AN 12345
                </p>
                <p style="margin: 0;">
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                </p>
            </td>
        </tr>
    </table>
</div>
    `,
  },
  {
    label: "1 day before reminder",
    subject: "⚡ Final Reminder: {subscriptionName} Renews Tomorrow!",
    body: `

<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #4a90e2; text-align: center;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800;">SubDub</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">                
                <p style="font-size: 16px; margin-bottom: 25px;">Hello <strong style="color: #4a90e2;">{userName}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">This is your <strong>final reminder!</strong> Your <strong>{subscriptionName}</strong> subscription will renew <strong>tomorrow</strong> on <strong style="color: #4a90e2;">{renewalDate}</strong>.</p>
                
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">🏆</span>
                            <strong>Plan:</strong> {planName}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">💰</span>
                            <strong>Price:</strong> {price}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">💳</span>
                            <strong>Payment Method:</strong> {paymentMethod}
                        </td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; margin-bottom: 25px;">If you wish to make any changes, please do so before midnight today.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">Thanks for being a valued subscriber!</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Sincerely,<br>
                    <strong>The SubDub Team</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0 0 10px;">
                    SubDub Inc. | 123 Main St, Anytown, AN 12345
                </p>
                <p style="margin: 0;">
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                </p>
            </td>
        </tr>
    </table>
</div>
    `,
  },
  {
    label: "Final day reminder",
    subject: "✅ {subscriptionName} Renews Today – You're All Set!",
    body: `

<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #4a90e2; text-align: center;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800;">SubDub</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">                
                <p style="font-size: 16px; margin-bottom: 25px;">Hey <strong style="color: #4a90e2;">{userName}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Today's the day! Your <strong>{subscriptionName}</strong> subscription renews today (<strong style="color: #4a90e2;">{renewalDate}</strong>).</p>
                
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">🏆</span>
                            <strong>Plan:</strong> {planName}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">💰</span>
                            <strong>Price:</strong> {price}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;">
                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #4a90e2; border-radius: 50%; text-align: center; color: white; margin-right: 10px;">💳</span>
                            <strong>Payment Method:</strong> {paymentMethod}
                        </td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; margin-bottom: 25px;">If everything looks good, you're all set for another subscription cycle. If you have any issues, our <a href="{supportLink}" style="color: #4a90e2; text-decoration: none;">support team</a> is here to assist.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">Looking forward to serving you another term!</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Warm regards,<br>
                    <strong>The SubDub Team</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0 0 10px;">
                    SubDub Inc. | 123 Main St, Anytown, AN 12345
                </p>
                <p style="margin: 0;">
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                    <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                </p>
            </td>
        </tr>
    </table>
</div>

    `,
  },
];

export default emailTemplates;
