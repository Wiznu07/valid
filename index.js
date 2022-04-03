addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname
  const params = url.searchParams
  const endpoint = 'https://order-sg.codashop.com/initPayment.action'
  const id = params.get('id')
  const srv = params.get('server')
  const zone = params.get('zone')
  const chc = {cf:{cacheTtl:600,cacheEverything:true}}
  try {
  if (path.includes('/ml')) {
    const body = `voucherPricePoint.id=4150&voucherPricePoint.price=1565.0&voucherPricePoint.variablePrice=0&user.userId=${id}&user.zoneId=${zone}&msisdn=&voucherTypeName=MOBILE_LEGENDS&shopLang=id_ID`
    const request = new Request(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
    const response = await fetch(request)
    const data = await response.json()
    return new Response(`{"success":true,"game":"Mobile Legends: Bang Bang","id":${id},"zoneId":${zone},"name":"${data.confirmationFields.username}"}`, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Expose-Headers': '*',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }
  if (path.includes('/ff')) {
    const body = `voucherPricePoint.id=8050&voucherPricePoint.price=1000.0&voucherPricePoint.variablePrice=0&user.userId=${id}&voucherTypeName=FREEFIRE&shopLang=id_ID`
    const request = new Request(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
    const response = await fetch(request, chc)
    const data = await response.json()
    return new Response(`{"success":true,"game":"Garena Free Fire","id":${id},"name":"${data.confirmationFields.roles[0].role}"}`, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Expose-Headers': '*',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }
  if (path.includes('/aov')) {
    const body = `voucherPricePoint.id=7946&voucherPricePoint.price=10000.0&voucherPricePoint.variablePrice=0&user.userId=${id}&voucherTypeName=AOV&shopLang=id_ID`
    const request = new Request(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
    const response = await fetch(request)
    const data = await response.json()
    return new Response(`{"success":true,"game":"Garena AOV (Arena Of Valor)","id":${id},"name":"${data.confirmationFields.roles[0].role}"}`, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Expose-Headers': '*',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  } else {
    return new Response(`{"success":false,"message":"Bad request"}`, {
      status: 400,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }
} catch (error) {
    return new Response(`{"success":false,"message":"Cannot find nickname from your request."}`, {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }
}
