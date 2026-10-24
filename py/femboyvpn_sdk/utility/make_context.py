# FemboyVpn SDK utility: make_context

from femboyvpn_sdk.core.context import FemboyVpnContext


def make_context_util(ctxmap, basectx):
    return FemboyVpnContext(ctxmap, basectx)
