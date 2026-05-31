import pandas as pd
import streamlit as st

st.set_page_config(page_title="Investments", page_icon="📈", layout="wide")

st.title("Investments — hello world")

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
