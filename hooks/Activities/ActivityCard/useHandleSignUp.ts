export const handleSignUp = async (
  token: string,
  userId: string,
  activityId: string,
  fechahora: string,
  action: string,
) => {
  try {
    const response = await fetch(
      'https://gympromanager.com/app-activities-enroll.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `token=${token}&userid=${userId}&activityid=${activityId}&fechahora=${fechahora}&action=${action}`,
      },
    )

    const data = await response.json()
    return {success: data.success, error: data.error}
  } catch (error) {
    return {success: false, error: 'No se pudo conectar al servidor.'}
  }
}
