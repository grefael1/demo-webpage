import os

import jwt
import pandas as pd
import streamlit as st

CF_TEAM_DOMAIN = os.environ.get("CF_ACCESS_TEAM_DOMAIN", "")
CF_AUD = os.environ.get("CF_ACCESS_AUD", "")
DEV_MODE = os.environ.get("DEV_MODE") == "1"


@st.cache_resource
def jwks_client():
    return jwt.PyJWKClient(f"{CF_TEAM_DOMAIN}/cdn-cgi/access/certs")


def require_cf_access():
    if DEV_MODE:
        return "dev@local"
    if not CF_TEAM_DOMAIN or not CF_AUD:
        st.error("Cloudflare Access env vars are not configured.")
        st.stop()
    headers = st.context.headers
    token = headers.get("Cf-Access-Jwt-Assertion") or headers.get("cf-access-jwt-assertion")
    if not token:
        st.error("Access denied.")
        st.stop()
    try:
        signing_key = jwks_client().get_signing_key_from_jwt(token).key
        claims = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            audience=CF_AUD,
            issuer=CF_TEAM_DOMAIN,
        )
    except jwt.PyJWTError:
        st.error("Access denied.")
        st.stop()
    return claims.get("email", "unknown")


email = require_cf_access()

st.set_page_config(page_title="Investments", page_icon="📈", layout="wide")
st.title("Investments — hello world")
st.caption(f"Signed in as {email}")

holdings = pd.DataFrame(
    {
        "ticker": ["VTI", "VXUS", "BND", "GLD"],
        "shares": [42, 28, 15, 5],
        "price": [275.10, 62.40, 73.15, 215.80],
    }
)
holdings["value"] = holdings["shares"] * holdings["price"]

total = holdings["value"].sum()
cash = 4_250.00
net_worth = total + cash

c1, c2, c3 = st.columns(3)
c1.metric("Net worth", f"${net_worth:,.2f}")
c2.metric("Invested", f"${total:,.2f}")
c3.metric("Cash", f"${cash:,.2f}")

st.subheader("Holdings")
st.dataframe(holdings, use_container_width=True, hide_index=True)

st.subheader("Allocation")
st.bar_chart(holdings.set_index("ticker")["value"])
